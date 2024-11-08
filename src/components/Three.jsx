import React, { useRef, useEffect, useState, memo } from 'react'
import * as d3 from 'd3';
import Globe from 'globe.gl';
import { configureWorldDatasets, updateCurrentDatasetFromZoom, initializeFilterLayers } from './viz_handlers.js';
import playMusic from './music_stream.js';

let radioGardenData, prevPov;

// load JSON data file and key name configuration data
const loadData = async path => fetch(path).then(data => [path, data.json()]);
const loadConfigKeys = async () => fetch('../../configKeys.json').then(data => data.json());

// contains main ThreeJS logic
const Three = ({ setHoverDetails, setMusicDetails, layerData, setFilterUpdateFunc, openModal, setStoryDetails, LayerType }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    let renderer, world;

    // resize window to fit screen
    const resizeRenderer = () => {
      if (renderer && mount) {
        const { clientWidth, clientHeight } = mount;
        renderer.setSize(clientWidth, clientHeight);
        world.width([clientWidth]);
        world.height([clientHeight]);
        world.controls().update();
      }
    };

    const wrapper = async () => {
      const mainRender = async () => {
        // filter for all standard layers (which follow the JSONL Schema)
        const standardLayerData = layerData.filter(l => l.layerType == LayerType.STANDARD);
        
        // enable all of the standard layers
        initializeFilterLayers(standardLayerData.map(s => {
          return {
            "layerID": s.id,
            "enable": true // all filters initially on
          };
        }));

        // begin loading of all data
        const loadDataPromises = standardLayerData.map(l => l.dataPath).map(p => loadData(p));

        // wait for all load data promises to resolve
        const partiallyResolvedLoadedDataArray = await Promise.all(loadDataPromises);
        const fullyResolvedLoadedDataArray = await Promise.all(partiallyResolvedLoadedDataArray.map(promiseArray => Promise.all(promiseArray)))
       
        // for each array [<data path str>, <data jsonl (array)>], extract the layer ID from the data path, then add it to each data group in the JSONL
        const loadedDataArray = fullyResolvedLoadedDataArray.map(loadedDataObj => loadedDataObj[1].map(dataGroup => { 
          const pathSplit = loadedDataObj[0].split("/");
          return {
            "layerID": pathSplit[pathSplit.length - 1].split(".")[0], 
            ...dataGroup
          }; 
        }));
        
        // flatten the array of data group lists into a long list of all data groups
        const loadedData = loadedDataArray.flat();
    
        // load radio garden json data
        radioGardenData = await fetch(
          layerData.filter(
            l => l.layerType == LayerType.CUSTOM && l.id == "radio_garden"
          )[0].dataPath
        ).then(data => data.json());
        
        // give each data point a unique ID across all of the datasets
        let idCounter = 0;
        for (let i = 0; i < loadedData.length; i++) {
          for (let j = 0; j < loadedData[i].data.length; j++) {
            loadedData[i].data[j].id = idCounter;
            idCounter += 1;
          }
        }
    
        // load config keys
        const configKeys = await loadConfigKeys();
    
        // create GlobeGL globe and renderer
        world = Globe()
          (mountRef.current)
          .globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg')
          .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
          .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png');
        renderer = world.renderer();

        // enable pointer interaction so that 3D objects can have hover interactions
        world.enablePointerInteraction(true);
        
        // store camera and controls objects, disable auto-rotate
        const camera = world.camera();
        const controls = world.controls();
        controls.autoRotate = false;
    
        // get the current amount that the user has zoomed into the globe
        const getZoomLevel = () => {
            // distance between camera and center of globe (origin)
            const distance = camera.position.length();
          
            // camera's field of view
            const fov = camera.fov;
    
            return {
              distance: distance,
              fov: fov
            };
        };
    
        // format data organized by visualization type
        const groupedDataByVizType = {
          "arc": [],
          "spikeHex": [],
          "cylinder": [],
          "html": [],
          "poly": []
        };

        /*
        deepcopy template for visualization types to store which objects should currently be rendered, 
        based on which filters are turned on to toggle data layers
        */
        let currentDataset = JSON.parse(JSON.stringify(groupedDataByVizType));

        // sort data groups by visualization type
        loadedData.forEach(dataObj => {
          groupedDataByVizType[dataObj.dataType].push(dataObj);
        });

        // remove or add data layers to be rendered based on current zoom level and changed filters
        const zoomUpdate = (changedLayerID, changedLayerEnabled, zoomPrevious) => {
          // get the current zoom level
          const zoomLevelCurrent = getZoomLevel().distance;

          // modify the current dataset to be rendered based on the filters and zoom level
          updateCurrentDatasetFromZoom(
            zoomLevelCurrent, 
            zoomPrevious != null ? zoomPrevious : zoomLevelCurrent,  // if there is no previous zoom level stored, pass the current zoom level
            groupedDataByVizType, 
            world, 
            currentDataset, 
            configKeys, 
            /* if both changedLayerID and changedLayerEnabled aren't null, 
              include them as a parameter to change the rendered data grouped based on the filter, 
              otherwise pass an empty array */
            (
              (changedLayerID != null && changedLayerEnabled != null) ? [
                {
                  "layerID": changedLayerID,
                  "enable": changedLayerEnabled
                }
              ] : []
            )
          );
        };

        // update music details in the menu
        const musicChangeCallback = (displayData) => {
          // the default song if the layer is deactivated or the visualization is Peter Gabriel's song "Panopticom"
          if (displayData == -1) {
            setMusicDetails({
              title: "#### Music: Panopticom by Peter Gabriel", 
              description: "\"The first song to be released from i/o is based on an idea I have been working on, to initiate the creation of an infinitely expandable accessible data globe: **The Panopticom**.\"\n\n*- Peter Gabriel*"
            });
          } else { // otherwise, display the current song's details
            const { station, channelData } = displayData;
            const description = `*Station*: **${station.title}**\n\n*Visit Station on Radio Garden*: [Click here!](https://radio.garden${station.url})\n\n*Country*: **${station.country}**\n\n---\n\n*Channel Title*: **${channelData.title}**\n\n*Visit Channel on Radio Garden*: [Click here!](https://radio.garden${channelData.radio_garden_url})`;
            setMusicDetails({
              title: "#### Radio Station", 
              description: description
            });
          }
        };

        // play music based on scroll position on globe
        const playMusicStandard = pov => {
          if (!radioActive) return; // if the radio layer is deactivated, do not play the music
          playMusic(pov, musicChangeCallback)
        };


        /* CALLBACKS FOR EACH DATA LAYER TYPE ON HOVER */
        
        // behavior when hovering on an data point of layer type arc
        const arcHoverCallback = (arc, prevArc) => {
          if (!arc) return;
          setHoverDetails({title: "## Expert Network Map", description: arc[configKeys.arcLabel]});
        };
      
        /* behavior when hovering on an data point of layer type hex 
          (do nothing, since a group of data points there isn't specific data to display) */
        const hexHoverCallback = hex => {};
      
        // behavior when hovering on an data point of layer type cylinder
        const cylinderHoverCallback = cylinder => {
          if (!cylinder) return;
          setHoverDetails({title: "## FabLabs", description: cylinder[configKeys.cylinderLabel]});
        };  
      
        // behavior when hovering on an data point of layer type HTML
        const htmlHoverCallback = htmlObj => {
          if (!htmlObj) return;
          setHoverDetails({title: "## Individual Stories", description: htmlObj[configKeys.htmlHoverLabel]});
        };
      
        // behavior when clicking on an data point of layer type HTML
        const htmlClickCallback = htmlObj => {
          if (!htmlObj[configKeys.htmlModalOnClick]) return;
          const currentZoom = getZoomLevel().distance;
          const latLng = {
            lat: htmlObj.lat,
            lng: htmlObj.lng
          };
          world.pointOfView({
            ...latLng,
            altitude: 0.5
          }, 1000);
          setTimeout(() => {
            zoomUpdate(null, null, currentZoom);
            playMusicStandard(latLng);
            setStoryDetails({ newTitle: htmlObj[configKeys.htmlModalTitle], newText: htmlObj[configKeys.htmlModalText] })
          }, 1000); // must be same as animation time for world.pointOfView() above
          setTimeout(() => {
            openModal();
          }, 1250)
        };

        // behavior when hovering on an data point of layer type polygon
        const polygonHoverCallback = poly => {
          if (!poly) return;
          setHoverDetails({title: "## Countries", description: poly[configKeys.polygonLabel]});
        }; 
    
        configureWorldDatasets(world, configKeys, [arcHoverCallback, hexHoverCallback, cylinderHoverCallback, htmlHoverCallback, htmlClickCallback, polygonHoverCallback], world.getGlobeRadius());

        let radioActive = true; // radio active starts activated
        setFilterUpdateFunc(() => (_changedLayerID, _changedLayerEnabled) => { // function in a function because the useState hook can be used with a function
          let changedLayerIDs, changedLayerEnableds;
          if (Array.isArray(_changedLayerID) && Array.isArray(_changedLayerEnabled)) {
            changedLayerIDs = _changedLayerID;
            changedLayerEnableds = _changedLayerEnabled;
          } else {
            changedLayerIDs = [_changedLayerID];
            changedLayerEnableds = [_changedLayerEnabled];
          }
          for (let i = 0; i < changedLayerIDs.length; i++) {
            const changedLayerID = changedLayerIDs[i];
            const changedLayerEnabled = changedLayerEnableds[i];
            const layer = layerData.filter(l => l.id == changedLayerID)[0];
            if (layer.layerType == LayerType.CUSTOM) {
              if (layer.id == "radio_garden") {
                radioActive = changedLayerEnabled;
                if (!changedLayerEnabled) playMusic(-1, musicChangeCallback);
              }
              continue;
            }
            zoomUpdate(changedLayerID, changedLayerEnabled, null);
            // if zoomLevel and zoomLevelCurrent are the same, the visualization won't update;
          }
        });

        let previousZoomLevel = 0;
        const scrollCallback = () => {
          const zoomLevel = getZoomLevel().distance;
          zoomUpdate(null, null, previousZoomLevel);
          previousZoomLevel = zoomLevel;
        };
        scrollCallback();
        window.addEventListener('wheel', scrollCallback);
        window.addEventListener('touchmove', scrollCallback);
    
        const mouseUpCallback = () => {
          setTimeout(() => {
            const pov = world.pointOfView()
            if (((!prevPov) || (pov.lat != prevPov.lat && pov.lng != prevPov.lng)) && radioActive) {
              playMusicStandard(pov);
              prevPov = pov;
            }
          }, 300); // delay for when the earth stops spinning after it's dragged. TODO replace with robust system.
        };
        window.addEventListener('mouseup', mouseUpCallback);
    
        playMusic(-1, musicChangeCallback);
    
      };
        
      await mainRender();

      resizeRenderer();
      window.addEventListener('resize', resizeRenderer);

      return () => {
        window.removeEventListener('resize', resizeRenderer);
      };

    };
  
    wrapper();

  }, [mountRef]);

  return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />;
}

export default memo(Three)
export { radioGardenData }
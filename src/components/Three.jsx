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

    /* declare undefined additional cleanup function that will be initialized by `mainRender` 
      if additional event listeners are added before the component is unmounted */
    let additionalCleanup;

    // async wrapper function to be able to call await within
    const wrapper = async () => {

      // main/initialization function
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
          // if this HTML element does not contain a modal, stop
          if (!htmlObj[configKeys.htmlModalOnClick]) return;

          // rotate the camera to zoom in on the HTML object clicked on
          const currentZoom = getZoomLevel().distance;
          const latLng = {
            lat: htmlObj.lat,
            lng: htmlObj.lng
          };
          world.pointOfView({
            ...latLng,
            altitude: 0.5
          }, 1000);

          /* after zooming, update the layers that should appear or disappear based on zoom distance, 
            play the appropriate music based on the scroll position on the globe, and update the menu with details */
          setTimeout(() => {
            zoomUpdate(null, null, currentZoom);
            playMusicStandard(latLng);
            setStoryDetails({ newTitle: htmlObj[configKeys.htmlModalTitle], newText: htmlObj[configKeys.htmlModalText] })
          }, 1000); // must be same as animation time for world.pointOfView() above

          // open the modal 250 miliseconds after the previous update
          setTimeout(() => {
            openModal();
          }, 1250)
        };

        // behavior when hovering on an data point of layer type polygon
        const polygonHoverCallback = poly => {
          if (!poly) return;
          setHoverDetails({title: "## Countries", description: poly[configKeys.polygonLabel]});
        }; 
    
        // bind the callbacks to the hover actions of the 3D objects
        configureWorldDatasets(
          world, 
          configKeys, 
          [arcHoverCallback, hexHoverCallback, cylinderHoverCallback, htmlHoverCallback, htmlClickCallback, polygonHoverCallback], 
          world.getGlobeRadius()
        );

        // the radio livestream starts activated
        let radioActive = true;

        // activate or deactivate layers based on changed filters
        setFilterUpdateFunc(() => (_changedLayerID, _changedLayerEnabled) => { // function in a function because the useState hook can be used with a function
          // format the parameters to be arrays
          let changedLayerIDs, changedLayerEnableds;
          if (Array.isArray(_changedLayerID) && Array.isArray(_changedLayerEnabled)) {
            changedLayerIDs = _changedLayerID;
            changedLayerEnableds = _changedLayerEnabled;
          } else {
            changedLayerIDs = [_changedLayerID];
            changedLayerEnableds = [_changedLayerEnabled];
          }

          // for each layer id that should be added or removed from rendering...
          for (let i = 0; i < changedLayerIDs.length; i++) {
            // store the layer id and whether it should be added or removed
            const changedLayerID = changedLayerIDs[i];
            const changedLayerEnabled = changedLayerEnableds[i];

            // filter for the data layer based on the id
            const layer = layerData.filter(l => l.id == changedLayerID)[0];

            // if it is a custom layer...
            if (layer.layerType == LayerType.CUSTOM) {
              // if it is the radio garden layer...
              if (layer.id == "radio_garden") {
                // set the activation status of the radio
                radioActive = changedLayerEnabled;

                // if the radio is being disabled, play the default music
                if (!changedLayerEnabled) playMusic(-1, musicChangeCallback);
              }
              continue;
            }

            // otherwise, add or remove the standard layer from rendering
            zoomUpdate(changedLayerID, changedLayerEnabled, null);
          }
        });

        // store current zoom level
        let previousZoomLevel = 0;

        // called whenever the user scrolls (zooms in or out)
        const scrollCallback = () => {
          // get the current zoom level
          const zoomLevel = getZoomLevel().distance;

          // update the layers being rendered based on the zoom distance
          zoomUpdate(null, null, previousZoomLevel);

          // set the previous zoom level to the current zoom level 
          previousZoomLevel = zoomLevel;
        };

        // call the scroll callback to initialize the layers being rendered and the previous zoom distance
        scrollCallback();

        // bind the scroll callback to a mouse movement or a zoom with touch
        window.addEventListener('wheel', scrollCallback);
        window.addEventListener('touchmove', scrollCallback);
    
        // callback to update the radio livestream when the mouse is lifted
        const mouseUpCallback = () => {
          // wait until the earth stops spinning...
          setTimeout(() => {
            // store the coordinates of the current point of view
            const pov = world.pointOfView()

            // if the radio is active, there is a previous position (i.e. not first time loaded), and the coordinates have changed...
            if (((!prevPov) || (pov.lat != prevPov.lat && pov.lng != prevPov.lng)) && radioActive) {
              // live stream radio music from the radio station closest to the current coordinates
              playMusicStandard(pov);

              // set the previous point of view data to the current point of view
              prevPov = pov;
            }
          }, 300);
        };

        // bind the mouse up callback to the 'mouseup' event
        window.addEventListener('mouseup', mouseUpCallback);
    
        // start playing the default music
        playMusic(-1, musicChangeCallback);
      };
        
      /* run the main/initializing function (need to await so that the 
        `world` variable is initialized and can be accessed by `resizeRender`) */
      await mainRender();

      // size the ThreeJS window to the current window dimensions
      resizeRenderer();

      // bind the resize function to the 'resize' event
      window.addEventListener('resize', resizeRenderer);

      additionalCleanup = () => {
        window.removeEventListener('wheel', scrollCallback);
        window.removeEventListener('touchmove', scrollCallback);
        window.removeEventListener('mouseup', mouseUpCallback);
      };

    };
  
    wrapper();

    return () => {
      // when the component is unmounted, remove event listeners if they have been added to prevent memory leak
      window.removeEventListener('resize', resizeRenderer);
      if (additionalCleanup) additionalCleanup();
    };

  }, [mountRef]);

  return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />;
}

export default memo(Three)
export { radioGardenData }
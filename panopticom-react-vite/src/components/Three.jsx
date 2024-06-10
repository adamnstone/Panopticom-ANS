import React, { useRef, useEffect, useState, memo } from 'react'
import * as THREE from 'three';
import { marked } from 'marked';
import * as d3 from 'd3';
import Globe from 'globe.gl';
import { configureWorldDatasets, updateCurrentDatasetFromZoom, initializeFilterLayers } from './viz_handlers.js';
import playMusic from './music_stream.js';
import { LayerType } from '../App.jsx';

let radioGardenData, prevPov;

const loadData = async path => fetch(path).then(data => [path, data.json()]);
const loadConfigKeys = async () => fetch('../../configKeys.json').then(data => data.json());

const Three = ({ setHoverDetails, setMusicDetails, layerData, setFilterUpdateFunc }) => {
  const mountRef = useRef(null);

  const arcHoverCallback = (arc, prevArc) => {
    if (!arc) return;
    setHoverDetails({title: "## Expert Network Map", description: arc.hoverLabel});
  };

  const hexHoverCallback = hex => {
    if (!hex) return;
    setHoverDetails({title: "## Expert Network Map", description: hex.hoverLabel});
  };

  const musicChangeCallback = ({ station, channelData }) => {
    const description = `*Station*: **${station.title}**\n\n*Visit Station on Radio Garden*: [Click here!](https://radio.garden${station.url})\n\n*Country*: **${station.country}**\n\n---\n\n*Channel Title*: **${channelData.title}**\n\n*Visit Channel on Radio Garden*: [Click here!](https://radio.garden${channelData.radio_garden_url})`;
    setMusicDetails({title: "#### Radio Station", description: description})
  }

  useEffect(() => {
    const mount = mountRef.current;
    let renderer;
    const wrapper = async () => {
    
    const mainRender = async () => {

      const standardLayerData = layerData.filter(l => l.layerType == LayerType.STANDARD);
      
      initializeFilterLayers(standardLayerData.map(s => {
        return {
          "layerID": s.id,
          "enable": true // all filters initially on
        };
      }));

      const loadDataPromises = standardLayerData.map(l => l.dataPath).map(p => loadData(p));
      // Wait for all promises to resolve
      const partiallyResolvedLoadedDataArray = await Promise.all(loadDataPromises);
      const fullyResolvedLoadedDataArray = await Promise.all(partiallyResolvedLoadedDataArray.map(promiseArray => Promise.all(promiseArray)))
      const loadedDataArray = fullyResolvedLoadedDataArray.map(p => p[1].map(d => { return {"layerID": p[0].split("/")[p[0].split("/").length - 1].split(".")[0], ...d}; }));
      // Combine the results into a single array
      const loadedData = loadedDataArray.flat();
  
      radioGardenData = await fetch(layerData.filter(l => l.layerType == LayerType.CUSTOM && l.id == "radio_garden")[0].dataPath).then(data => data.json());
      
      let idCounter = 0;
      for (let i = 0; i < loadedData.length; i++) {
        for (let j = 0; j < loadedData[i].data.length; j++) {
          loadedData[i].data[j].id = idCounter;
          idCounter += 1;
        }
      }
  
      const configKeys = await loadConfigKeys();
  
      const weightColor = d3.scaleSequentialSqrt(d3.interpolateYlOrRd)
        .domain([0, 1e7]);
  
      const world = Globe()
        (mountRef.current)
        .globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg')
        .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
        .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png');
      
      renderer = world.renderer();

      world
        .enablePointerInteraction(true); // ENABLE THIS TO ALWAYS BE ABLE TO HOVER AND SEE THE EXPERT NETWORK MAP CONNECTION LABELS
      
      const camera = world.camera();
      // Add auto-rotation
      const controls = world.controls();
      controls.autoRotate = false;
      //controls.autoRotate = true;
      //controls.autoRotateSpeed = 0.6;
  
      // get how much the user is zoomed in
      const getZoomLevel = () => {
          // Distance from camera to globe center
          const distance = camera.position.length();
  
          // Camera FOV
          const fov = camera.fov;
  
          return {
          distance: distance,
          fov: fov,
          };
      };
  
      configureWorldDatasets(world, configKeys, arcHoverCallback, hexHoverCallback);
  
      // format data orgnized by visualization type
      const groupedDataByVizType = {
        "arc": [],
        "spikeHex": []
      };
      loadedData.forEach(dataObj => {
        groupedDataByVizType[dataObj.dataType].push(dataObj);
      });
      
      let currentDataset = {
        "arc": [],
        "spikeHex": []
      };
  
      const setCurrentDataset = groupedDataset => {
        groupedDataset['arc'].forEach(arcData => currentDataset.arc = [...currentDataset.arc, ...arcData.data]);
        groupedDataset['spikeHex'].forEach(spikeHexData => currentDataset.spikeHex = [...currentDataset.spikeHex, ...spikeHexData.data]);
      };

      let radioActive = true; // radio active starts activated
      setFilterUpdateFunc(() => (changedLayerID, changedLayerEnabled) => { // function in a function because the useState hook can be used with a function
        const layer = layerData.filter(l => l.id == changedLayerID)[0];
        if (layer.layerType == LayerType.CUSTOM) {
          if (layer.id == "radio_garden") {
            radioActive = changedLayerEnabled;
            if (!changedLayerEnabled) playMusic(-1);
          }
          return;
        }
        const zoomLevelCurrent = getZoomLevel().distance;
        updateCurrentDatasetFromZoom(zoomLevelCurrent, zoomLevelCurrent, groupedDataByVizType, world, currentDataset, configKeys, [{
          "layerID": changedLayerID,
          "enable": changedLayerEnabled
        }]);
        // if zoomLevel and zoomLevelCurrent are the same, the visualization won't update;
      });

      let previousZoomLevel = 0;
      const scrollCallback = () => {
        const zoomLevel = getZoomLevel().distance;
        updateCurrentDatasetFromZoom(zoomLevel, previousZoomLevel, groupedDataByVizType, world, currentDataset, configKeys, []);
        previousZoomLevel = zoomLevel;
      };
      scrollCallback();
      window.addEventListener('wheel', scrollCallback);
  
      const mouseUpCallback = () => {
        setTimeout(() => {
          const pov = world.pointOfView()
          if (((!prevPov) || (pov.lat != prevPov.lat && pov.lng != prevPov.lng)) && radioActive) {
            playMusic(pov, musicChangeCallback);
            prevPov = pov;
          }
        }, 300); // delay for when the earth stops spinning after it's dragged. TODO replace with robust system.
      };
      window.addEventListener('mouseup', mouseUpCallback);
  
      playMusic(-1);
  
    };
      
    await mainRender();

  };
  
  wrapper();

  }, [mountRef]);

  return <div ref={mountRef} />;
}

export default memo(Three)
export { radioGardenData }
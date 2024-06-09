import React, { useRef, useEffect, useState, memo } from 'react'
import * as THREE from 'three';
import * as d3 from 'd3';
import Globe from 'globe.gl';
import { configureWorldDatasets, updateCurrentDatasetFromZoom } from './viz_handlers.js';
import playMusic from './music_stream.js';

const formattedDatasetPaths = [
  '../../datasets/formatted_datasets/exnm_data.jsonl',
  '../../datasets/formatted_datasets/labs_geo_data.jsonl'
];

const radioGardenDataPath = '../../datasets/radio_garden_data/radio_garden_data.jsonl';

let radioGardenData, prevPov;

const loadData = async path => fetch(path).then(data => {console.log(data);return data.json();});
const loadConfigKeys = async () => fetch('../../configKeys.json').then(data => {console.log(data);return data.json();});

const Three = ({ setHoverDetails, setMusicDetails }) => {
  const mountRef = useRef(null);

  const arcHoverCallback = (arc, prevArc) => {
    if (!arc) return;
    console.log(arc);
    setHoverDetails({title: "Expert Network Map Link", description: arc.hoverLabel});
  };

  const hexHoverCallback = hex => {

  };

  useEffect(() => {
    const mount = mountRef.current;
    console.log(mount);
    let renderer;
    const wrapper = async () => {
    
    const mainRender = async () => {

      const loadDataPromises = formattedDatasetPaths.map(p => loadData(p));
      // Wait for all promises to resolve
      const loadedDataArray = await Promise.all(loadDataPromises);
      // Combine the results into a single array
      const loadedData = loadedDataArray.flat();
  
      radioGardenData = await fetch(radioGardenDataPath).then(data => data.json());
      
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

  
      let previousZoomLevel = 0;
      const scrollCallback = () => {
        const zoomLevel = getZoomLevel().distance;
        updateCurrentDatasetFromZoom(zoomLevel, previousZoomLevel, groupedDataByVizType, world, currentDataset, configKeys);
        previousZoomLevel = zoomLevel;
      };
      scrollCallback();
      window.addEventListener('wheel', scrollCallback);
  
      const mouseUpCallback = () => {
        setTimeout(() => {
          const pov = world.pointOfView()
          if ((!prevPov) || (pov.lat != prevPov.lat && pov.lng != prevPov.lng)) {
            playMusic(pov);
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
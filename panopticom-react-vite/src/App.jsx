import React, { useState, useRef } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import Three from './components/Three.jsx'
import Filters from './components/Filters.jsx'
import { filter } from 'd3'

const LayerType = {
  STANDARD: 0,
  CUSTOM: 1
}

function App() {
  const [hoverDetails, setHoverDetails] = useState({});
  const [musicDetails, setMusicDetails] = useState({});

  const [filterUpdateFunc, setFilterUpdateFunc] = useState(null);

  const layerData = [
    {
      title: "Expert Network Map",
      dataPath: '../datasets/formatted_datasets/exnm.jsonl',
      id: "exnm",
      layerType: LayerType.STANDARD
    },
    {
      title: "FabLabs",
      dataPath: '../datasets/formatted_datasets/labs.jsonl',
      id: "labs",
      layerType: LayerType.STANDARD
    },
    {
      title: "Individual Stories",
      dataPath: "../datasets/formatted_datasets/individual_stories.jsonl",
      id: "individual_stories",
      layerType: LayerType.STANDARD
    },
    {
      title: "Radio Station Geo",
      dataPath: '../datasets/formatted_datasets/radio_hex.jsonl',
      id: "radio_hex",
      layerType: LayerType.STANDARD
    },
    {
      title: "Radio Stations",
      dataPath: '../datasets/radio_garden_data/radio_garden.jsonl',
      id: "radio_garden",
      layerType: LayerType.CUSTOM
    }
  ];
  
  return (
    <>
      <Three setHoverDetails={setHoverDetails} setMusicDetails={setMusicDetails} layerData={layerData} setFilterUpdateFunc={setFilterUpdateFunc} />
      <Filters hoverDetails={hoverDetails} musicDetails={musicDetails} layerData={layerData} filterUpdateFunc={filterUpdateFunc} />
    </>
  )
}

export default App
export { LayerType }
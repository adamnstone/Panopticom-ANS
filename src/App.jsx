import React, { useState, useRef } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import Three from './components/Three.jsx'
import Filters from './components/Filters.jsx'
import IndividualStoriesDetails from './components/IndividualStoriesDetails.jsx'
import { filter } from 'd3'

const LayerType = {
  STANDARD: 0,
  CUSTOM: 1
}

function App() {
  const [hoverDetails, setHoverDetails] = useState({});
  const [musicDetails, setMusicDetails] = useState({});

  const [filterUpdateFunc, setFilterUpdateFunc] = useState(null);

  // Modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [storyTitle, setStoryTitle] = React.useState(null);
  const [storyText, setStoryText] = React.useState(null);
  const setStoryDetails = ({ newTitle, newText }) => {
    setStoryTitle(newTitle);
    setStoryText(newText);
  }

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
      title: "Music Narrative Summaries",
      dataPath: "../datasets/formatted_datasets/music_narrative.jsonl",
      id: "music_narrative",
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
      <Three setHoverDetails={setHoverDetails} setMusicDetails={setMusicDetails} layerData={layerData} setFilterUpdateFunc={setFilterUpdateFunc} openModal={handleOpen} setStoryDetails={setStoryDetails} />
      <Filters hoverDetails={hoverDetails} musicDetails={musicDetails} layerData={layerData} filterUpdateFunc={filterUpdateFunc} />
      <IndividualStoriesDetails open={open} handleOpen={handleOpen} handleClose={handleClose} storyTitle={storyTitle} storyText={storyText} />
    </>
  )
}

export default App
export { LayerType }
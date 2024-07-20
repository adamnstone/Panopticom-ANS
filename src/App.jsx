import React, { useState, useRef } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import Three from './components/Three.jsx'
import Filters from './components/Filters.jsx'
import IndividualStoriesDetails from './components/IndividualStoriesDetails.jsx'
import { filter } from 'd3'

function App({ layerData, LayerType }) {
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
  
  return (
    <>
      <Three setHoverDetails={setHoverDetails} setMusicDetails={setMusicDetails} layerData={layerData} setFilterUpdateFunc={setFilterUpdateFunc} openModal={handleOpen} setStoryDetails={setStoryDetails} LayerType={LayerType} />
      <Filters hoverDetails={hoverDetails} musicDetails={musicDetails} layerData={layerData} filterUpdateFunc={filterUpdateFunc} />
      <IndividualStoriesDetails open={open} handleOpen={handleOpen} handleClose={handleClose} storyTitle={storyTitle} storyText={storyText} />
    </>
  )
}

export default App
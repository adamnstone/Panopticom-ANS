import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import Three from './components/Three.jsx'
import Filters from './components/Filters.jsx'
import IndividualStoriesDetails from './components/IndividualStoriesDetails.jsx'
import OverlayText from './components/OverlayText.jsx'

function App({ layerData, LayerType }) {
  // handles hover text that appears in the menu
  const [hoverDetails, setHoverDetails] = useState({});
  const [musicDetails, setMusicDetails] = useState({});

  // handles the function that causes the visualization to active or deactivate certain data layers based on user filters
  const [filterUpdateFunc, setFilterUpdateFunc] = useState(null);

  // handles modal behavior
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // handles personal story title and body text
  const [storyTitle, setStoryTitle] = React.useState(null);
  const [storyText, setStoryText] = React.useState(null);
  const setStoryDetails = ({ newTitle, newText }) => {
    setStoryTitle(newTitle);
    setStoryText(newText);
  }

  /*
  - Three handles the globe visualization
  - OverlayText handles the foreground UI elements
  - Filters handles the user menu
  - IndividualStoriesDetails handles the modal for datasets of the HTML data layer type
  */
  return (
    <>
      <Three setHoverDetails={setHoverDetails} setMusicDetails={setMusicDetails} layerData={layerData} setFilterUpdateFunc={setFilterUpdateFunc} openModal={handleOpen} setStoryDetails={setStoryDetails} LayerType={LayerType} />
      <OverlayText />
      <Filters hoverDetails={hoverDetails} musicDetails={musicDetails} layerData={layerData} filterUpdateFunc={filterUpdateFunc} />
      <IndividualStoriesDetails open={open} handleOpen={handleOpen} handleClose={handleClose} storyTitle={storyTitle} storyText={storyText} />
    </>
  )
}

export default App
import React, { useState, useRef } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import Three from './components/Three.jsx'
import Filters from './components/Filters.jsx'

function App() {
  const [hoverDetails, setHoverDetails] = useState({});
  const [musicDetails, setMusicDetails] = useState({});
  return (
    <>
      <Three setHoverDetails={setHoverDetails} setMusicDetails={setMusicDetails} />
      <Filters hoverDetails={hoverDetails} musicDetails={musicDetails} />
    </>
  )
}

export default App
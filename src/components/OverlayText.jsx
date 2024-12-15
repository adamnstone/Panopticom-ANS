import React from 'react'

// contains foreground UI elements and links
const OverlayText = () => {
  return (
    <div id="overlay-text-container">
        <a href="./about" id="about-link-text">About</a>
        <img src="./fablab-img.png" id="fablab-icon" onClick={() => {window.open("https://www.fablabs.io/")}}></img>
        <p id="panopticom-txt" onClick={() => {window.open("https://petergabriel.com/release/panopticom/")}}>PANOPTICOM</p>
    </div>
  )
}

export default OverlayText
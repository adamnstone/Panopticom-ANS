import React from 'react'
import Three from './components/Three.jsx'

const Dashboard = ({ layerData, LayerType }) => {
  return (
    <>
    <style>{`
    #three-container {
        width: 50vw; 
        height: 50vh;
    }
    `}</style>
    <div id="three-container">
    <Three layerData={layerData} LayerType={LayerType} 
    setHoverDetails={() => {}} 
    setMusicDetails={() => {}} 
    setFilterUpdateFunc={() => {}} 
    openModal={() => {}} 
    setStoryDetails={() => {}} />
    </div>
    </>
  )
}

export default Dashboard
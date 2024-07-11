import React from 'react'
import Three from './components/Three.jsx'

const Dashboard = ({ layerData, LayerType }) => {
  return (
    <>
    <style>{`
    #three-container {
        width: 50vh; 
        height: 48vh;
        border-radius: 25px;
        overflow: hidden;
    }
    .grid-item {
        height: 48vh;
        margin: 5px;
    }
    `}</style>
    <div className="container">
        <div className="row">
            <div className="col-4">
                <div className="item-container bg-secondary grid-item align-items-center justify-content-center d-flex">

                </div>
            </div>
            <div className="col-4">
                <div className="item-container grid-item align-items-center justify-content-center d-flex">
                    <div id="three-container">
                        <Three layerData={layerData} LayerType={LayerType} 
                        setHoverDetails={() => {}} 
                        setMusicDetails={() => {}} 
                        setFilterUpdateFunc={() => {}} 
                        openModal={() => {}} 
                        setStoryDetails={() => {}} />
                    </div>
                </div>
            </div>
            <div className="col-4">
                <div className="item-container bg-secondary grid-item align-items-center justify-content-center d-flex">

                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-4">
                <div className="item-container bg-secondary grid-item align-items-center justify-content-center d-flex">

                </div>
            </div>
            <div className="col-4">
                <div className="item-container bg-secondary grid-item align-items-center justify-content-center d-flex">

                </div>
            </div>
            <div className="col-4">
                <div className="item-container bg-secondary grid-item align-items-center justify-content-center d-flex">

                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Dashboard
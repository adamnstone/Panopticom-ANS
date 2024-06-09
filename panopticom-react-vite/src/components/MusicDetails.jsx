import React from 'react'

const MusicDetails = ({ musicDetails }) => {
    return (
        <>
            <div className="fs-4"> {musicDetails.title} </div>
            <hr></hr>
            <div className="fs-6"> {musicDetails.description} </div>
        </>
    )
}

export default MusicDetails
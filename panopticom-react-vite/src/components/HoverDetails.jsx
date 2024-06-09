import React, { useState } from 'react'

const HoverDetails = ({ hoverDetails }) => {
    return (
        <>
            <div className="fs-1"> {hoverDetails.title} </div>
            <hr></hr>
            <div className="fs-3"> {hoverDetails.description} </div>
        </>
    )
}

export default HoverDetails
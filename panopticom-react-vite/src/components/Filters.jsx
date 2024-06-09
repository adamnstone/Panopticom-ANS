import React, { useState } from 'react'
import HoverDetails from './HoverDetails.jsx'
import MusicDetails from './MusicDetails.jsx'

const Filters = ({ hoverDetails, musicDetails }) => {
    return (
        <div className="card position-absolute top-50 translate-middle-y w-25 h-75" style={{left: "5%"}}>
            <div className="card-body d-flex flex-column justify-content-center rounded border border-primary">
                <div className="row my-auto">
                    <div className="column">
                    <div className="card">
                            <div className="card-body rounded border border-secondary">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" />
                                    <label className="form-check-label">
                                        Filter visualization
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row my-auto">
                    <div className="column">
                        <div className="card">
                            <div className="card-body rounded border border-secondary">
                                <HoverDetails hoverDetails={hoverDetails} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row my-auto">
                    <div className="column">
                        <div className="card">
                            <div className="card-body rounded border border-secondary">
                                <MusicDetails musicDetails={musicDetails} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Filters
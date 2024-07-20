import React, { useState } from 'react'
import HoverDetails from './HoverDetails.jsx'
import MusicDetails from './MusicDetails.jsx'
import ActiveLayerFilters from './ActiveLayerFilters.jsx'

const Filters = ({ hoverDetails, musicDetails, layerData, filterUpdateFunc }) => {
    const [checkedList, setCheckedList] = useState(layerData.map(l => true)); // all filters initially true, also must change in Three.jsx
    const [menuOpen, setMenuOpen] = useState(false);

    const onChangeCallback = (layerID, position, isSolo) => {
        if (isSolo) {
            const updatedCheckedState = checkedList.map((item, index) => index === position);

            filterUpdateFunc(layerData.map(i => i.id), updatedCheckedState);

            setCheckedList(updatedCheckedState);
        }
        else {
            let changedLayerEnabled;
            const updatedCheckedState = checkedList.map((item, index) =>
                {
                    if (index === position) {
                        changedLayerEnabled = !item;
                        return changedLayerEnabled;
                    } else {
                        return item;
                    }
                }
            );

            filterUpdateFunc(layerID, changedLayerEnabled);
        
            setCheckedList(updatedCheckedState);
        }
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div>
            <div className={`hamburger-icon ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
                &#9776;
            </div>
            <div className={`menu-container ${menuOpen ? 'open' : ''}`}>
                <div className="card position-absolute top-49" style={{left: "1%", height: "85%", width: "100%", zIndex: 1000000}}>
                    <div className="card-body d-flex flex-column justify-content-center rounded border border-primary">
                        <div className="row my-auto">
                            <div className="column">
                                <div className="card">
                                    <div className="card-body rounded border border-secondary">
                                        <ActiveLayerFilters layerData={layerData} onChangeCallback={onChangeCallback} checkedList={checkedList} />
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
            </div>
        </div>
    )
}

export default Filters

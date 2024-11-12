import React, { useState } from 'react'
import HoverDetails from './HoverDetails.jsx'
import MusicDetails from './MusicDetails.jsx'
import ActiveLayerFilters from './ActiveLayerFilters.jsx'

// contains menu for user filters and hover details
const Filters = ({ hoverDetails, musicDetails, layerData, filterUpdateFunc }) => {
    // all filters initially true
    const [checkedList, setCheckedList] = useState(layerData.map(l => true));
    
    // handles whether the menu is open or collapsed
    const [menuOpen, setMenuOpen] = useState(false);

    // callback for updating the filter state
    const onChangeCallback = (layerID, position, isSolo) => {
        // will store whether each filter is active or deactive
        let updatedCheckedState;

        // if the 'solo' button has been pressed on this layer...
        if (isSolo) { 
            // set the 'solo'-ed filter as the only active filter
            updatedCheckedState = checkedList.map((item, index) => index === position);

            // update the visualization based on the active filters
            filterUpdateFunc(layerData.map(i => i.id), updatedCheckedState);
        } else { 
            // will store whether the filtering being changed is becoming active or deactive
            let changedLayerEnabled;

            // flip only the state of the filter being changed, store the changed state
            updatedCheckedState = checkedList.map((item, index) =>
                {
                    if (index === position) {
                        changedLayerEnabled = !item;
                        return changedLayerEnabled;
                    } else {
                        return item;
                    }
                }
            );

            // update the visualization by only changing the filter being toggled
            filterUpdateFunc(layerID, changedLayerEnabled);
        }

        // update the filter UI to reflect which filters are active
        setCheckedList(updatedCheckedState);
    };

    // toggle the menu state
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

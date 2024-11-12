import React from 'react'

// UI filters in menu for user to turn on and off data layers
const ActiveLayerFilters = ({ layerData, onChangeCallback, checkedList }) => {
    // for each layer, add a filter with the appropraite callback
    const elems = [];
    for (let i = 0; i < layerData.length; i++) {
        const layer = layerData[i];
        elems.push(
            (
                <div className="form-check" key={layer.id}>
                    <button className="btn btn-primary" onClick={() => onChangeCallback(layer.id, i, true)} style={{'marginRight': '20px', 'fontSize': '0.6rem'}}>Solo</button>
                    <input className="form-check-input" type="checkbox" onChange={() => onChangeCallback(layer.id, i, false)} checked={checkedList[i]} />
                    <label className="form-check-label">
                        {layer.title}
                    </label>
                </div>
            )
        );
    }
    return (
        <>
            {elems}
        </>
    )
}

export default ActiveLayerFilters
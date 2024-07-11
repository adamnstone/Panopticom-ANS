import React from 'react'

const ActiveLayerFilters = ({ layerData, onChangeCallback, checkedList }) => {
    const elems = [];
    for (let i = 0; i < layerData.length; i++) {
        const l = layerData[i];
        elems.push(
            (
                <div className="form-check" key={l.id}>
                    <button className="btn btn-primary" onClick={() => onChangeCallback(l.id, i, true)} style={{'marginRight': '20px', 'fontSize': '0.6rem'}}>Solo</button>
                    <input className="form-check-input" type="checkbox" onChange={() => onChangeCallback(l.id, i, false)} checked={checkedList[i]} />
                    <label className="form-check-label">
                        {l.title}
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
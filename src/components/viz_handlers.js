import * as THREE from 'three';

let filterLayers = [];

// reshape a data array to deconstruct lat and lng properties from the pos property for each data point
const latLngReshape = arr => {
    // for each data point, reshape the data point and add it to the formatted array
    const reshapedData = [];
    arr.forEach(a => {
        reshapedData.push({
            "lat": a.pos.lat,
            "lng": a.pos.lng,
            ...a
        });
    });

    // return the formatted data
    return reshapedData;
};

// update the visualization with new arc data
const updateArcData = (arcData, world, configKeys) => {
    // arc data object that will be passed to the GlobeGL world object
    const formattedArcData = [];

    // for every arc in the dataset...
    arcData.forEach(arc => {
        // store whether the two values of the arc data are arrays (i.e. whether it is a multicolor arc)
        const arcColorIsArray = Array.isArray(arc[configKeys.arcColor]);
        const arcDashLengthIsArray = Array.isArray(arc[configKeys.arcDashLength]);

        // if it is a multicolor arc...
        if (arcColorIsArray || arcDashLengthIsArray) { 
            const arcColorArray = arc[configKeys.arcColor];
            const arcDashLengthArray = arc[configKeys.arcDashLength];
            if (
                // if only one of the variables is an array
                (!(arcColorIsArray && arcDashLengthIsArray)) || 
                // or they are both arrays but of different lengths...
                ((arcColorIsArray && arcDashLengthIsArray) && (arcColorArray.length != arcDashLengthArray.length))
            ) { 
                // throw an error
                throw `Data Error: only one, but not the other, is an array; or they are different lengths: ${configKeys.arcColor}, ${configKeys.arcDashLength}`;
            }

            // store the array length
            const arrLen = arcColorArray.length;

            // calculate the total length of one cycle of the moving arc relative to the total length of the arc between the points
            const totalCycleLength = arc[configKeys.arcDashGap] + arc[configKeys.arcDashLength].reduce((a, c) => a + c);

            /* for each arc that will be created that together make up the multicolor arc, will store the
                initial time to delay before begining arc movement so that it follows after previous arcs */
            let cummulativeInitialGap = 0;

            // for each arc...
            for (let i = 0; i < arrLen; i++) {
                // reshape the arc data
                const arcToAdd = {
                    "startLat": arc.start.lat,
                    "startLng": arc.start.lng,
                    "endLat": arc.end.lat,
                    "endLng": arc.end.lng,
                    ...arc,
                };

                // add the i-th arc color, dash length, and initial gap to this multicolor arc piece
                arcToAdd[configKeys.arcColor] = arcToAdd[configKeys.arcColor][i];
                arcToAdd[configKeys.arcDashLength] = arcToAdd[configKeys.arcDashLength][i];
                arcToAdd['arcDashInitialGap'] = cummulativeInitialGap;

                // add the i-th dash length to the cummulative initial gap
                cummulativeInitialGap += arcToAdd[configKeys.arcDashLength];
                
                /* add a gap between cycles of this multicolor arc piece so that it gives time for 
                    subsequent multicolor arc pieces to move and without overlapping */
                arcToAdd[configKeys.arcDashGap] = totalCycleLength - arcToAdd[configKeys.arcDashLength];
                
                // add the new arc to the final data
                formattedArcData.push(arcToAdd);
            }
        } else { // otherwise, if it is not a multicolor arc
            // simply add the reshaped arc to the dataset
            formattedArcData.push({
                "startLat": arc.start.lat,
                "startLng": arc.start.lng,
                "endLat": arc.end.lat,
                "endLng": arc.end.lng,
                "arcDashInitialGap": 0,
                ...arc
            });
        }
    });

    // update the final arc data on the globe
    world.arcsData(formattedArcData);
};

// update the visualization with new spikeHex data
const updateSpikeHexData = (spikeHexData, world, configKeys) => {
    // for every spikeHex, add a reshaped data point to the formatted data set
    const formattedSpikeHexData = latLngReshape(spikeHexData);

    // update the spikeHex data on the globe
    world.hexBinPointsData(formattedSpikeHexData);
};

// update the visualization with new cylinder data
const updateCylinderData = (cylinderData, world, configKeys) => {
    // for every cylinder, add a reshaped data point to the formatted data set
    const formattedCylinderData = latLngReshape(cylinderData);

    // update the cylinder data on the globe
    world.objectsData(formattedCylinderData);
};

// update the visualization with new html data
const updateHtmlData = (htmlData, world, configKeys) => {
    // for every html data point, add a reshaped data point to the formatted data set
    const formattedHtmlData = latLngReshape(htmlData);

    // update the html data on the globe
    world.htmlElementsData(formattedHtmlData);
};

// update the visualization with new polygon data
const updatePolyData = (polyData, world, configKeys) => {
    // for every polygon data point, format the polygon data differently based on whether it's a MultiPolygon
    const formattedPolyData = [];
    polyData.forEach(poly => {
        formattedPolyData.push({
            "geometry": {
                "type": poly[configKeys.polyIsMultiPolygon] ? "MultiPolygon" : "Polygon",
                "coordinates": poly[configKeys.polygonCoordinates]
            },
            ...poly
        });
    });

    // update the polygon data on the globe
    world.polygonsData(formattedPolyData);
};  

// update all of the data set types in the visualization
const updateData = (currentDataset, world, configKeys, datasetsToChange="all") => {
    // ["arc", "spikeHex", ...]
    const layerTypes = Object.keys(currentDataset);

    // for each layer type, map it to a specific function to update those layer types from the dataset in the visualization
    const layerTypeToFunc = {
        "arc": () => updateArcData(currentDataset.arc, world, configKeys),
        "spikeHex": () => updateSpikeHexData(currentDataset.spikeHex, world, configKeys),
        "cylinder": () => updateCylinderData(currentDataset.cylinder, world, configKeys),
        "html": () => updateHtmlData(currentDataset.html, world, configKeys),
        "poly": () => updatePolyData(currentDataset.poly, world, configKeys)
    };

    /* if the layerTypes does not match the keys of the layerTypeToFunc object, throw an error; this is to ensure 
        that if a new layer is added, a new update function is added and defined here */
    if (JSON.stringify(Object.keys(layerTypeToFunc)) != JSON.stringify(layerTypes))
        throw `Error: layer types in current dataset don't match layerTypeToFunc: layerTypes=[${layerTypes}], layerTypeToFunc=[${Object.keys(layerTypeToFunc)}]`;

    // for each layer type, update it in the visualization if it is supposed to be updated
    layerTypes.forEach(layerType => {
        if (datasetsToChange == "all" || datasetsToChange.includes(layerType))
            layerTypeToFunc[layerType]();
    });
};

// map GlobeGL attributes and callbacks of visualization layers to properties of the JSONL Schema datasets
const configureWorldDatasets = (world, configKeys, [ arcHoverCallback, hexHoverCallback, cylinderHoverCallback, htmlHoverCallback, htmlClickCallback, polygonHoverCallback ], worldRadius) => {
    // arc
    world
        .onArcHover((a, b) => arcHoverCallback(a, b)) 
        .arcColor(configKeys.arcColor)
        .arcDashLength(configKeys.arcDashLength)
        .arcDashGap(configKeys.arcDashGap)
        .arcDashAnimateTime(configKeys.arcAnimateTime)
        .arcStroke(d => d[configKeys.arcStroke] == 0 ? null : d[configKeys.arcStroke])
        .arcDashInitialGap('arcDashInitialGap'); // `arcDashInitialGap` is only accessed by multicolor arc handling code in `updateArcData`, not by user in creating the JSONL, so doesn't go through `configKeys`
    
    // spikeHex
    world
        .onHexHover(h => hexHoverCallback(h))
        .hexLabel(d => d.points[0][configKeys.hexLabel])
        .hexBinPointWeight(configKeys.hexPointWeight)
        .hexAltitude(d => d.sumWeight * 5e-9)
        .hexBinResolution(5)
        .hexTopColor(d => d.points[0][configKeys.hexTopColor])
        .hexSideColor(d => d.points[0][configKeys.hexSideColor])
        .hexBinMerge(true)
        .hexTransitionDuration(1000);

    // cylinder
    world
        .objectThreeObject(obj => {
            const geometry = new THREE.CylinderGeometry(0.3, 0.3, obj[configKeys.cylinderHeight], 16); 
            const material = new THREE.MeshBasicMaterial({color: obj[configKeys.cylinderColor]}); 
            const cylinder = new THREE.Mesh(geometry, material);
            return cylinder;
        }) // create a ThreeJS cylinder object customizable based on the JSONL Schema
        .objectLat(obj => obj.lat)
        .objectLng(obj => obj.lng)
        .objectRotation(obj => { return {x: 90, y: 0, z: 0}; })
        .onObjectHover(o => cylinderHoverCallback(o))
        .objectAltitude(obj => obj[configKeys.cylinderHeight] / 2 / worldRadius); // in terms of globe radius units

    // html
    world
        .htmlLat(obj => obj.lat)
        .htmlLng(obj => obj.lng)
        .htmlAltitude(obj => obj[configKeys.htmlAltitude])
        .htmlElement(obj => {
            // create HTML element
            const el = document.createElement("div");
            el.className = obj[configKeys.htmlClass];
            el.style['pointer-events'] = 'auto';
            el.style.cursor = 'pointer';
            
            // bind mouse hover and click events to callbacks
            el.addEventListener("mouseover", () => htmlHoverCallback(obj));
            el.onclick = () => htmlClickCallback(obj);

            // create the image to add to the div
            const imgEl = document.createElement("img");
            imgEl.src = obj[configKeys.htmlImgPath];
            imgEl.alt = obj[configKeys.htmlAltText];

            // add the tint using CSS
            if (obj[configKeys.htmlImgTint] != "none") {
                imgEl.style.filter = `opacity(0.6) drop-shadow(0 0 0 ${obj[configKeys.htmlImgTint]})`;
            }

            // add the image to the div
            el.appendChild(imgEl);
            return el;
        });

    // poly
    world
        .polygonCapColor(obj => obj[configKeys.polygonMainColor])
        .polygonSideColor(obj => obj[configKeys.polygonSideColor])
        .polygonsTransitionDuration(4000)
        .polygonAltitude(obj => obj[configKeys.polygonAltitude])
        .onPolygonHover(hoverD => {
            // slightly increase the altitude of the polygons on hover, and change color
            world
                .polygonAltitude(d => d === hoverD ? d[configKeys.polygonAltitude] + 0.06 : d[configKeys.polygonAltitude])
                .polygonCapColor(d => d === hoverD ? 'steelblue' : d[configKeys.polygonMainColor]);

            // trigger the hover callback
            polygonHoverCallback(hoverD);
        })
};

// initialize the state of each standard layer type
const initializeFilterLayers = initializedFilterLayers => filterLayers = initializedFilterLayers;

const updateCurrentDatasetFromZoom = (zoomLevel, previousZoomLevel, groupedDataByVizType, world, currentDataset, configKeys, filterLayersToChange) => {
    // for every layer type to change, change that layer's enabled state
    filterLayersToChange.forEach(f => {
        filterLayers.filter(i => f.layerID == i.layerID)[0].enable = f.enable;
    });

    // will store each data group and whether it should be enabled or disabled
    const datasetsToChange = [];

    // for every layer type (["arc", "spikeHex", ...])...
    Object.keys(groupedDataByVizType).forEach(dataType => {
        // for every data group of that layer type...
        groupedDataByVizType[dataType].forEach(dataGroup => {
            // if that data group has just crossed the zoom threshold for the layer to be toggled or a filter has 
            if (
                ((dataGroup.zoomLevel <= zoomLevel) != (dataGroup.zoomLevel <= previousZoomLevel)) || (filterLayersToChange.map(f => f.layerID).includes(dataGroup.layerID))
            ) {
                datasetsToChange.push({
                    data: dataGroup,
                    enable: (dataGroup.zoomLevel <= zoomLevel) && (filterLayers.filter(i => i.layerID == dataGroup.layerID)[0].enable)
                });
            }
        });
    });

    datasetsToChange.forEach(dataset => {
        if (dataset.enable) {
            currentDataset[dataset.data.dataType] = [...currentDataset[dataset.data.dataType], ...dataset.data.data];
        } else {
            const datasetIDs = dataset.data.data.map(d => d.id);
            currentDataset[dataset.data.dataType] = currentDataset[dataset.data.dataType].filter(d => !datasetIDs.includes(d.id));
        }
    });

    const dataTypesUpdated = Array.from(new Set(datasetsToChange.map(d => d.data.dataType)));
    updateData(currentDataset, world, configKeys, dataTypesUpdated);
};

export { configureWorldDatasets, updateCurrentDatasetFromZoom, initializeFilterLayers }
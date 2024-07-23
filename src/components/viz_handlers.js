import { formatDefaultLocale } from 'd3';
import * as THREE from 'three';

let filterLayers = [];

const updateArcData = (arcData, world, configKeys) => {
    const formattedArcData = [];
    arcData.forEach(arc => {
        const arcColorIsArray = Array.isArray(arc[configKeys.arcColor]);
        const arcDashLengthIsArray = Array.isArray(arc[configKeys.arcDashLength]);
        if (arcColorIsArray || arcDashLengthIsArray) { // if it is a multicolor arc
            const arcColorArray = arc[configKeys.arcColor];
            const arcDashLengthArray = arc[configKeys.arcDashLength];
            if ((!(arcColorIsArray && arcDashLengthIsArray)) || ((arcColorIsArray && arcDashLengthIsArray) && (arcColorArray.length != arcDashLengthArray.length))) {
                throw `Only one, but not the other, is an array; or they are different lengths: ${configKeys.arcColor}, ${configKeys.arcDashLength}`;
            }
            const arrLen = arcColorArray.length;
            let cummulativeInitialGap = 0;
            const totalCycleLength = arc[configKeys.arcDashGap] + arc[configKeys.arcDashLength].reduce((a,c)=>a+c);
            for (let i = 0; i < arrLen; i++) {
                const arcToAdd = {
                    "startLat": arc.start.lat,
                    "startLng": arc.start.lng,
                    "endLat": arc.end.lat,
                    "endLng": arc.end.lng,
                    ...arc,
                };
                arcToAdd[configKeys.arcColor] = arcToAdd[configKeys.arcColor][i];
                arcToAdd[configKeys.arcDashLength] = arcToAdd[configKeys.arcDashLength][i];
                arcToAdd['arcDashInitialGap'] = cummulativeInitialGap;

                cummulativeInitialGap += arcToAdd[configKeys.arcDashLength];
                
                arcToAdd[configKeys.arcDashGap] = totalCycleLength - arcToAdd[configKeys.arcDashLength];
                formattedArcData.push(arcToAdd);
            }
        } else { // else, if it is not a multicolor arc
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
    world.arcsData(formattedArcData);
};

const updateSpikeHexData = (spikeHexData, world, configKeys) => {
    const formattedSpikeHexData = [];
    spikeHexData.forEach(spikeHex => {
        formattedSpikeHexData.push({
            "lat": spikeHex.pos.lat,
            "lng": spikeHex.pos.lng,
            ...spikeHex
        })
    });
    world.hexBinPointsData(formattedSpikeHexData);
};

const updateCylinderData = (cylinderData, world, configKeys) => {
    const formattedCylinderData = [];
    cylinderData.forEach(cylinder => {
        formattedCylinderData.push({
            "lat": cylinder.pos.lat,
            "lng": cylinder.pos.lng,
            ...cylinder
        })
    });
    world.objectsData(formattedCylinderData);
};

const updateHtmlData = (htmlData, world, configKeys) => {
    const formattedHtmlData = [];
    htmlData.forEach(html => {
        formattedHtmlData.push({
            "lat": html.pos.lat,
            "lng": html.pos.lng,
            ...html
        })
    });
    world.htmlElementsData(formattedHtmlData);
};

const updatePolyData = (polyData, world, configKeys) => {
    const formattedPolyData = [];
    polyData.forEach(poly => {
        formattedPolyData.push({
            "geometry": {
                "type": poly[configKeys.polyIsMultiPolygon] ? "MultiPolygon" : "Polygon",
                "coordinates": poly[configKeys.polygonCoordinates]
            },
            ...poly
        })
    });
    world.polygonsData(formattedPolyData);
};  

const updateData = (currentDataset, world, configKeys, datasetsToChange="all") => {
    if (datasetsToChange == "all" || datasetsToChange.includes("arc")) updateArcData(currentDataset.arc, world, configKeys);
    if (datasetsToChange == "all" || datasetsToChange.includes("spikeHex")) updateSpikeHexData(currentDataset.spikeHex, world, configKeys);
    if (datasetsToChange == "all" || datasetsToChange.includes("cylinder")) updateCylinderData(currentDataset.cylinder, world, configKeys);
    if (datasetsToChange == "all" || datasetsToChange.includes("html")) updateHtmlData(currentDataset.html, world, configKeys);
    if (datasetsToChange == "all" || datasetsToChange.includes("poly")) updatePolyData(currentDataset.poly, world, configKeys);
};

const configureWorldDatasets = (world, configKeys, [ arcHoverCallback, hexHoverCallback, cylinderHoverCallback, htmlHoverCallback, htmlClickCallback, polygonHoverCallback ], worldRadius) => {
    // arc
    world
        .onArcHover((a,b) => arcHoverCallback(a, b))
        //.arcLabel(configKeys.arcLabel)
        .arcColor(configKeys.arcColor)
        .arcDashLength(configKeys.arcDashLength)
        .arcDashGap(configKeys.arcDashGap)
        .arcDashAnimateTime(configKeys.arcAnimateTime)
        .arcStroke(d => d[configKeys.arcStroke] == 0 ? null : d[configKeys.arcStroke])
        .arcDashInitialGap('arcDashInitialGap'); // `arcDashInitialGap` is only accessed by multicolor code, not by user in creating the JSONL, so doesn't go through `configKeys`
    
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
            const geometry = new THREE.CylinderGeometry( 0.3, 0.3, obj[configKeys.cylinderHeight], 16 ); 
            const material = new THREE.MeshBasicMaterial( {color: obj[configKeys.cylinderColor]} ); 
            const cylinder = new THREE.Mesh( geometry, material );
            return cylinder;
        })
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
            const el = document.createElement("div");
            el.className = obj[configKeys.htmlClass];
            el.style['pointer-events'] = 'auto';
            el.style.cursor = 'pointer';
            el.addEventListener("mouseover", () => htmlHoverCallback(obj));
            el.onclick = () => htmlClickCallback(obj);
            const imgEl = document.createElement("img");
            imgEl.src = obj[configKeys.htmlImgPath];
            imgEl.alt = obj[configKeys.htmlAltText];
            if (obj[configKeys.htmlImgTint] != "none") {
                imgEl.style.filter = `opacity(0.6) drop-shadow(0 0 0 ${obj[configKeys.htmlImgTint]})`;
            }
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
            world
                .polygonAltitude(d => d === hoverD ? d[configKeys.polygonAltitude] + 0.06 : d[configKeys.polygonAltitude])
                .polygonCapColor(d => d === hoverD ? 'steelblue' : d[configKeys.polygonMainColor]);

            polygonHoverCallback(hoverD);
        })
};

const initializeFilterLayers = initializedFilterLayers => filterLayers = initializedFilterLayers;

const updateCurrentDatasetFromZoom = (zoomLevel, previousZoomLevel, groupedDataByVizType, world, currentDataset, configKeys, filterLayersToChange) => {
    filterLayersToChange.forEach(f => {
        filterLayers.filter(i => f.layerID == i.layerID)[0].enable = f.enable;
    });
    const datasetsToChange = [];
    Object.keys(groupedDataByVizType).forEach(dataType => {
        groupedDataByVizType[dataType].forEach(dataGroup => {
            if (((dataGroup.zoomLevel <= zoomLevel) != (dataGroup.zoomLevel <= previousZoomLevel)) || (filterLayersToChange.map(f => f.layerID).includes(dataGroup.layerID))) {
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
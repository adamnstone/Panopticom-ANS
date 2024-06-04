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

const updateData = (currentDataset, world, configKeys, datasetsToChange="all") => {
    if (datasetsToChange == "all" || datasetsToChange.includes("arc")) updateArcData(currentDataset.arc, world, configKeys);
    if (datasetsToChange == "all" || datasetsToChange.includes("spikeHex")) updateSpikeHexData(currentDataset.spikeHex, world, configKeys);
};

const configureWorldDatasets = (world, configKeys) => {
    // arc
    world
        .arcLabel(configKeys.arcLabel)
        .arcColor(configKeys.arcColor)
        .arcDashLength(configKeys.arcDashLength)
        .arcDashGap(configKeys.arcDashGap)
        .arcDashAnimateTime(configKeys.arcAnimateTime)
        .arcStroke(d => d[configKeys.arcStroke] == 0 ? null : d[configKeys.arcStroke])
        .arcDashInitialGap('arcDashInitialGap'); // `arcDashInitialGap` is only accessed by multicolor code, not by user in creating the JSONL, so doesn't go through `configKeys`
    
    // spikeHex
    world
        .hexLabel(d => d.points[0][configKeys.hexLabel])
        .hexBinPointWeight(configKeys.hexPointWeight)
        .hexAltitude(d => d.sumWeight * 6e-8)
        .hexBinResolution(4)
        .hexTopColor(d => d.points[0][configKeys.hexTopColor])
        .hexSideColor(d => d.points[0][configKeys.hexSideColor])
        .hexBinMerge(true);
};

const updateCurrentDatasetFromZoom = (zoomLevel, previousZoomLevel, groupedDataByVizType, world, currentDataset, configKeys) => {
    const datasetsToChange = [];
    Object.keys(groupedDataByVizType).forEach(dataType => {
        groupedDataByVizType[dataType].forEach(dataGroup => {
            if ((dataGroup.zoomLevel <= zoomLevel) != (dataGroup.zoomLevel <= previousZoomLevel)) {
                datasetsToChange.push({
                    data: dataGroup,
                    enable: dataGroup.zoomLevel <= zoomLevel
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
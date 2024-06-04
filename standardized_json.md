# Standard JSONL Schema

The `.jsonl` file should consist of a list of json objects in the format below (note that `.jsonl` doesn't support comments, they are just for explaining the format of the object).

[For the technical `JSON Schema` click here!](./dev/ThreeJS/jsonSchema.json) Below is simply an explanation of the format but does not contain a technical description.

---

### Arc Example

```json
{
    "zoomLevel": 300, // zoom at which this attribute is disabled/enabled
    "dataType": "arc", // options: arc, spikeHex
    "data": [ // includes all arcs
        { // single-color arc example
            "hoverLabel": "Datapoint #1", // what text appears when hovering over this arc
            "start": { // starting coordinates
                "lat": 11.04,
                "lng": 324.2
            },
            "end": { // ending coordinates
                "lat": -10.4,
                "lng": 3.2
            },
            "height": 10, // height of the arc
            "dashLength": 0.5, // relative length of the arc
            "gapLength": 0.5, // relative length of the gap when the arc is not displaed
            "color": "red", // color of the arc
            "thickness": 1, // thickness of the arc
            "animationTime": 2000 // time (in ms) for the arc to complete one cycle
        },
        { // multicolor arc example
            "hoverLabel": "Datapoint #2",
            "start": {
                "lat": 31.04,
                "lng": 40.2
            },
            "end": {
                "lat": 30.4,
                "lng": 60.9
            },
            "height": 10,
            "dashLength": [0.2, 0.5, 0.1, 0.35], // list of relative lengths of the arcs, for each corresponding arc `color`
            "gapLength": 0.6,
            "color": ["white", "red", "yellow", "silver"], // sequential color of the arcs
            "thickness": 2,
            "animationTime": 1000
        }
    ]
}
```

### SpikeHex Example

```json
{
    "zoomLevel": 250, // zoom at which this attribute is disabled/enabled
    "dataType": "spikeHex", // options: arc, spikeHex
    "data": [
        {
            "hoverLabel": "Datapoint #1", // what text appears when hovering over this spike
            "pos": { // coordinates of the spike
                "lat": 33.0,
                "lng": -50.2
            },
            "height": 1000000, // height of the spike
            "color": "green" // color of the spike
        },
        {
            "hoverLabel": "Datapoint #2",
            "pos": {
                "lat": -33.0,
                "lng": 50.2
            },
            "height": 5000000,
            "color": "yellow"
        }
    ]
}
```

### Combined `JSONL` File example

*(using the above data)*

```json
[
    {
        "zoomLevel": 300,
        "dataType": "arc",
        "data": [
            {
                "hoverLabel": "Datapoint #1",
                "start": {
                    "lat": 11.04,
                    "lng": 84.2
                },
                "end": {
                    "lat": -10.4,
                    "lng": 3.2
                },
                "height": 10,
                "dashLength": 0.5,
                "gapLength": 0.5,
                "color": "red",
                "thickness": 1,
                "animationTime": 2000
            },
            {
                "hoverLabel": "Datapoint #2",
                "start": {
                    "lat": 31.04,
                    "lng": 40.2
                },
                "end": {
                    "lat": 30.4,
                    "lng": 60.9
                },
                "height": 10,
                "dashLength": [0.2, 0.5, 0.1, 0.35],
                "gapLength": 0.6,
                "color": ["white", "red", "yellow", "silver"],
                "thickness": 2,
                "animationTime": 1000
            }
        ]
    },
    {
        "zoomLevel": 250,
        "dataType": "spikeHex",
        "data": [
            {
                "hoverLabel": "Datapoint #1",
                "pos": {
                    "lat": 33.0,
                    "lng": 30.2
                },
                "height": 1000000,
                "color": "green"
            },
            {
                "hoverLabel": "Datapoint #2",
                "pos": {
                    "lat": 33.0,
                    "lng": 20.2
                },
                "height": 5000000,
                "color": "yellow"
            }
        ]
    }
]
```
# Standard JSONL Schema

The `.jsonl` file should consist of a list of json objects in the format below (note that `.jsonl` doesn't support comments, they are just for explaining the format of the object).

[For the technical `JSON Schema` click here!](./dev/jsonSchema.json) Below is simply an explanation of the format but does not contain a technical description.

**When adding a new datasource, the name of the file must match the 'id' provided in the 'id' field in the layerData object.

Hex is problematic because multiple datasets will overlap in their buckets. Only use one dataset in the spikeHex layer at a time.

**NOTE** for html elements the class goes on the div surrounding the image

---

### Arc Example

```json
{
    "zoomLevel": 300, // zoom at which this attribute is disabled/enabled
    "dataType": "arc", // options: arc, html, cylinder, poly, spikeHex
    "data": [ // includes all arcs
        { // single-color arc example
            "hoverLabel": "*Arc #1*: **Label in markdown...**", // what text appears when hovering over this arc, written in markdown
            "start": { // starting coordinates
                "lat": 11.04,
                "lng": 32.2
            },
            "end": { // ending coordinates
                "lat": -10.4,
                "lng": 3.2
            },
            "height": 10, // height of the arc
            "dashLength": [0.5], // relative length of the arc
            "gapLength": 0.5, // relative length of the gap when the arc is not displayed
            "color": ["rgba(0,0,255,1)"], // color of the arc, must be in rgba format
            "thickness": 1, // thickness of the arc
            "animationTime": 2000 // time (in ms) for the arc to complete one cycle
        },
        { // multicolor arc example
            "hoverLabel": "*Arc #2*: **Label in markdown...**",
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
            "color": ["rgba(0,0,255,1)", "rgba(255,255,0,1)", "rgba(255,255,255,1)"], // sequential color of the arcs, must be in rgba format
            "thickness": 2,
            "animationTime": 1000
        }
    ]
}
```

### HTML Example

```json
{
    "zoomLevel": 50, // zoom at which this attribute is disabled/enabled
    "dataType": "html", // options: arc, html, cylinder, poly, spikeHex
    "data": [ // includes all html datapoints
        { // example #1
            "pos": { // coordinates
                "lat": 27.4730743, 
                "lng": 89.6386794
            },
            "altitude": 0.1, // altitude above globe
            "hoverLabel": "Visit from Rosemarry School to FabLab Bhutan", // what text appears when hovering over this html element, written in markdown
            "class": "story-thought-bubble", // css class of the html element (div)
            "imgPath": "../thought_bubble.png", // path to an image placed inside of the div
            "altText": "Thought Bubble", // alt text property of the <img> element
            "modalOnClick": true, // if true, a modal will appear when the html element is clicked on (details of the modal are in the following properties)
            "modalTitle": "## Visit from Rosemarry School to FabLab Bhutan", // title of the modal, written in markdown
            "modalText": "###### A group of young and inspiring students along with few Teachers from Rosemarry Primary School, Thimphu  visits Fablab Bhutan on 22 May 2019 . The Kids have been introduced the little bits, how to play with the little bits, introduction on the different types of machines available in the lab. They were also Showcased with some of the products made from the machines.", // body text of the modal, written in markdown
            "imgTint": "rgb(0,255,0)" // adds a tint to the <img> element, for no tint write "none"
        },
        { // example #2
            "pos": {
                "lat": 63.4427, 
                "lng": -20.2734
            },
            "altitude": 0.1,
            "hoverLabel": "Kids Recreate Model of the Houses Under the Lava: FabLab Vestmannaeyjar",
            "class": "story-thought-bubble",
            "imgPath": "../thought_bubble.png",
            "altText": "Thought Bubble",
            "modalOnClick": true,
            "modalTitle": "## Kids Recreate Model of the Houses Under the Lava: FabLab Vestmannaeyjar",
            "modalText": "###### Húsið Tunga stóð við Heimagötu 4, var byggt árið 1913, en fór undir hraun árið 1973. Í húsinu var bakarí og síðar hótel og var það því oftast kallað Hótel Berg eða Magnúsarbakarí. Jóhann Sörensen byggði húsið. Þar leigði herbergi um tíma Björn Kalman, lögfræðingur og skákmaður á árunum milli 1931-1940.\n\n ###### Tunga's house stood at Heimagatu 4, was built in 1913, but was destroyed by lava in 1973. The building housed a bakery and later a hotel, so it was often called Hotel Berg or Magnúsar Bakery. Jóhann Sörensen built the house. Björn Kalman, a lawyer and chess player, rented a room there for a while between 1931-1940.\n\n ###### BJARNI RÚNAR KRISTJÁNSSON, BREKI GEORG FREYSSON, BENEDIKT ÞÓR EYÞÓRSSON",
            "imgTint": "none"
        }
    ]
}
```

### Cylinder Example

```json
{
    "zoomLevel": 250, // zoom at which this attribute is disabled/enabled
    "dataType": "cylinder", // options: arc, html, cylinder, poly, spikeHex
    "data": [
        {
            "hoverLabel": "Datapoint #1", // what text appears when hovering over this cylinder, written in markdown
            "pos": { // coordinates of the cylinder
                "lat": 33.0,
                "lng": -50.2
            },
            "height": 1, // height of the cylinder
            "color": "rgba(0,255,0,1)" // color of the cylinder, must be in rgba format
        },
        {
            "hoverLabel": "Datapoint #2",
            "pos": {
                "lat": -33.0,
                "lng": 50.2
            },
            "height": 1,
            "color": "rgba(0,0,255,1)"
        }
    ]
}
```

### Poly Example

```json
{
    "zoomLevel": 250, // zoom at which this attribute is disabled/enabled
    "dataType": "poly", // options: arc, html, cylinder, poly, spikeHex
    "data": [
        {
            "path": [[10.0, 20.20], [20.0, 20.20], [20.0, 10.20], [10.0, 10.20], [10.0, 20.20]], // shape of the polygon, written in GeoJSON format (equivalent to 'coordinates' property, https://stevage.github.io/geojson-spec/, https://github.com/geojson/schema?tab=readme-ov-file)
            "isMultiPolygon": false, // true if the 'path' is in the format of a GeoJSON MultiPolygon, false if the 'path' is in the format of a GoeJSON Polygon
            "hoverLabel": "Datapoint #1", // what text appears when hovering over this polygon, written in markdown
            "altitude": 0.1, // altitude of the polygon
            "mainColor": "rgba(0,255,0,1)", // color of the polygon when viewed from above, must be in rgba format
            "sideColor": "rgba(0,100,0,0.05)" // color of the walls around the perimeter of the polygon that connect to the globe, when viewed from the side; to have no walls, set alpha = 0
        },
        {
            "path": [[[[10.0, 20.20], [20.0, 20.20], [20.0, 10.20], [10.0, 10.20], [10.0, 20.20]]], [[[40.0, 20.20], [50.0, 20.20], [50.0, 10.20], [40.0, 10.20], [40.0, 20.20]]]],
            "isMultiPolygon": true,
            "hoverLabel": "Datapoint #2",
            "altitude": 0.1,
            "mainColor": "rgba(0,255,0,1)",
            "sideColor": "rgba(0,100,0,0.05)"
        }
    ]
}
```

### SpikeHex Example (Not Recommended)

```json
{
    "zoomLevel": 250, // zoom at which this attribute is disabled/enabled
    "dataType": "spikeHex", // options: arc, html, cylinder, poly, spikeHex
    "data": [
        {
            "hoverLabel": "Datapoint #1", // what text appears when hovering over this spike, written in markdown
            "pos": { // coordinates of the spike
                "lat": 33.0,
                "lng": -50.2
            },
            "height": 1000000, // height of the spike
            "color": "rgba(0,255,0,1)" // color of the spike, must be in rgba format
        },
        {
            "hoverLabel": "Datapoint #2",
            "pos": {
                "lat": -33.0,
                "lng": 50.2
            },
            "height": 5000000,
            "color": "rgba(0,0,255,1)"
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
                "hoverLabel": "*Arc #1*: **Label in markdown...**",
                "start": {
                    "lat": 11.04,
                    "lng": 32.2
                },
                "end": {
                    "lat": -10.4,
                    "lng": 3.2
                },
                "height": 10,
                "dashLength": [0.5],
                "gapLength": 0.5,
                "color": ["rgba(0,0,255,1)"],
                "thickness": 1,
                "animationTime": 2000
            },
            {
                "hoverLabel": "*Arc #2*: **Label in markdown...**",
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
                "color": ["rgba(0,0,255,1)", "rgba(255,255,0,1)", "rgba(255,255,255,1)"],
                "thickness": 2,
                "animationTime": 1000
            }
        ]
    },
    {
        "zoomLevel": 50,
        "dataType": "html",
        "data": [
            {
                "pos": {
                    "lat": 27.4730743, 
                    "lng": 89.6386794
                },
                "altitude": 0.1,
                "hoverLabel": "Visit from Rosemarry School to FabLab Bhutan",
                "class": "story-thought-bubble",
                "imgPath": "../thought_bubble.png",
                "altText": "Thought Bubble",
                "modalOnClick": true,
                "modalTitle": "## Visit from Rosemarry School to FabLab Bhutan",
                "modalText": "###### A group of young and inspiring students along with few Teachers from Rosemarry Primary School, Thimphu  visits Fablab Bhutan on 22 May 2019 . The Kids have been introduced the little bits, how to play with the little bits, introduction on the different types of machines available in the lab. They were also Showcased with some of the products made from the machines.",
                "imgTint": "rgb(0,255,0)"
            },
            {
                "pos": {
                    "lat": 63.4427, 
                    "lng": -20.2734
                },
                "altitude": 0.1,
                "hoverLabel": "Kids Recreate Model of the Houses Under the Lava: FabLab Vestmannaeyjar",
                "class": "story-thought-bubble",
                "imgPath": "../thought_bubble.png",
                "altText": "Thought Bubble",
                "modalOnClick": true,
                "modalTitle": "## Kids Recreate Model of the Houses Under the Lava: FabLab Vestmannaeyjar",
                "modalText": "###### Húsið Tunga stóð við Heimagötu 4, var byggt árið 1913, en fór undir hraun árið 1973. Í húsinu var bakarí og síðar hótel og var það því oftast kallað Hótel Berg eða Magnúsarbakarí. Jóhann Sörensen byggði húsið. Þar leigði herbergi um tíma Björn Kalman, lögfræðingur og skákmaður á árunum milli 1931-1940.\n\n ###### Tunga's house stood at Heimagatu 4, was built in 1913, but was destroyed by lava in 1973. The building housed a bakery and later a hotel, so it was often called Hotel Berg or Magnúsar Bakery. Jóhann Sörensen built the house. Björn Kalman, a lawyer and chess player, rented a room there for a while between 1931-1940.\n\n ###### BJARNI RÚNAR KRISTJÁNSSON, BREKI GEORG FREYSSON, BENEDIKT ÞÓR EYÞÓRSSON",
                "imgTint": "rgb(255,100,50)"
            }
        ]
    },
    {
        "zoomLevel": 250,
        "dataType": "cylinder",
        "data": [
            {
                "hoverLabel": "Datapoint #1",
                "pos": {
                    "lat": 33.0,
                    "lng": -50.2
                },
                "height": 1,
                "color": "rgba(0,255,0,1)"
            },
            {
                "hoverLabel": "Datapoint #2",
                "pos": {
                    "lat": -33.0,
                    "lng": 50.2
                },
                "height": 1,
                "color": "rgba(0,0,255,1)"
            }
        ]
    },
    {
        "zoomLevel": 250,
        "dataType": "poly",
        "data": [
            {
                "path": [[10.0, 20.20], [20.0, 20.20], [20.0, 10.20], [10.0, 10.20], [10.0, 20.20]],
                "isMultiPolygon": false,
                "hoverLabel": "Datapoint #1",
                "mainColor": "rgba(0,255,0,1)",
                "sideColor": "rgba(0,100,0,0.05)"
            },
            {
                "path": [[[[10.0, 20.20], [20.0, 20.20], [20.0, 10.20], [10.0, 10.20], [10.0, 20.20]]], [[[40.0, 20.20], [50.0, 20.20], [50.0, 10.20], [40.0, 10.20], [40.0, 20.20]]]],
                "isMultiPolygon": true,
                "hoverLabel": "Datapoint #2",
                "altitude": 0.1,
                "mainColor": "rgba(0,255,0,1)",
                "sideColor": "rgba(0,100,0,0.05)"
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
                    "lng": -50.2
                },
                "height": 1000000,
                "color": "rgba(0,255,0,1)"
            },
            {
                "hoverLabel": "Datapoint #2",
                "pos": {
                    "lat": -33.0,
                    "lng": 50.2
                },
                "height": 5000000,
                "color": "rgba(0,0,255,1)"
            }
        ]
    }
]
```
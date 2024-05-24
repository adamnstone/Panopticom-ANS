// DOCUMENTATION: https://datatracker.ietf.org/doc/html/rfc7946#section-3.1.6
// LAB LOCATION DATA: https://fmcu.fablabs.io/files/labs_clean.json
// Expert Network Map Data: https://gitlab.fabcloud.org/pub/project/expert-network-map/-/raw/main/public/final_data.json?ref_type=heads

window.onload = () => {

  let width = d3.select("#map").node().getBoundingClientRect().width
  let height = 500
  const sensitivity = 75

  let projection = d3.geoOrthographic()
    .scale(250)
    .center([0, 0])
    .rotate([0,-30])
    .translate([width / 2, height / 2])

  // configure projection objects
  const initialScale = projection.scale()
  let path = d3.geoPath().projection(projection)

  let svg = d3.select("#map")
    .append("svg")
    .attr("width", width)
    .attr("height", height)

  let globe = svg.append("circle")
    .attr("fill", "#EEE")
    .attr("stroke", "#000")
    .attr("stroke-width", "0.2")
    .attr("cx", width/2)
    .attr("cy", height/2)
    .attr("r", initialScale)

  // handle rotation controls
  svg.call(d3.drag().on('drag', () => {
    const rotate = projection.rotate()
    const k = sensitivity / projection.scale()
    projection.rotate([
      rotate[0] + d3.event.dx * k,
      rotate[1] - d3.event.dy * k
    ])
    path = d3.geoPath().projection(projection)
    svg.selectAll("path").attr("d", path)
  }))
    .call(d3.zoom().on('zoom', () => {
      if(d3.event.transform.k > 0.3) {
        projection.scale(initialScale * d3.event.transform.k)
        path = d3.geoPath().projection(projection)
        svg.selectAll("path").attr("d", path)
        globe.attr("r", projection.scale())
      }
      else {
        d3.event.transform.k = 0.3
      }
    }))

  let map = svg.append("g")

  const loadWorldData = async () => d3.json("../datasets/world.json");
  const loadExpertNetworkMapData = async () => d3.json("../datasets/exnmData.json");
  const loadLabsData = async () => d3.json("../datasets/labs_clean.json");

  const renderData = async () => {
    const data = await loadWorldData();
    const exnmData = await loadExpertNetworkMapData();
    const labsClean = await loadLabsData();

    // create countries on globe
    map.append("g")
      .attr("class", "countries")
      .selectAll("path")
      .data(data.features)
      .enter().append("path")
      .attr("class", d => "country_" + d.properties.name.replace(" ","_"))
      .attr("d", path)
      .attr("fill", "white")
      .style('stroke', 'black')
      .style('stroke-width', 0.3)
      .style("opacity",0.8)

    // reshape lab location data to be plottable on the globe
    const reformatExnmData = () => {
      const reformattedData = [];
      labsClean.forEach(l => {
        reformattedData.push({"type":"Feature","properties":{"name":`Lab_${l.name}`},"geometry":{"type":"Point","coordinates":[l.longitude, l.latitude]},"id":l.id});
      });
      return reformattedData;
    }

    // plot labs
    map.append("g").selectAll("path").data(reformatExnmData()).enter().append("path")
    .attr("class", d => "lab_location")
    .attr("d", path)
    .attr("fill", "black")
    .style('stroke', 'black')
    .style('stroke-width', 0.3)
    .style("opacity",0.8)

    // auto rotate
    d3.timer(function(elapsed) {
      const rotate = projection.rotate()
      const k = sensitivity / projection.scale()
      projection.rotate([
        rotate[0] - 1 * k,
        rotate[1]
      ])
      path = d3.geoPath().projection(projection)
      svg.selectAll("path").attr("d", path)
    },200)

  };

  renderData();

};
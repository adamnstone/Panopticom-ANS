import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const IcelandicTourism = () => {
  const ref = useRef();

  const data = [
    { label: 'USA', value: 28.9 },
    { label: 'UK', value: 12.7 },
    { label: 'Germany', value: 6.1 },
    { label: 'Poland', value: 5.7 },
    { label: 'France', value: 4.3 },
    { label: 'Italy', value: 3.9 },
    { label: 'Spain', value: 3.4 },
    { label: 'China', value: 3.3 },
    { label: 'Canada', value: 3.0 },
    { label: 'Netherlands', value: 2.8 }
  ].reverse();

  useEffect(() => {
    const svg = d3.select(ref.current);
    const width = ref.current.clientWidth;
    const height = ref.current.clientHeight;
    const radius = Math.min(width, height) / 2;
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    svg.selectAll("*").remove(); // Clear previous content

    const arc = d3.arc()
      .outerRadius(radius - 10)
      .innerRadius(0);

    const labelArc = d3.arc()
      .outerRadius(radius - 40)
      .innerRadius(radius - 40);

    const pie = d3.pie()
      .sort(null)
      .value(d => d.value);

    const g = svg.append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    const tooltip = d3.select("body").append("div")
      .attr("class", "tooltip-c")
      .style("opacity", 0);

    const arcs = g.selectAll(".arc")
      .data(pie(data))
      .enter().append("g")
      .attr("class", "arc");

    arcs.append("path")
      .attr("d", arc)
      .attr("fill", d => color(d.data.label))
      .on("mouseover", function(event, d) {
        tooltip.transition()
          .duration(200)
          .style("opacity", .9);
        tooltip.html(`${d.data.label}: ${d.data.value}%`)
          .style("left", (event.pageX + 5) + "px")
          .style("top", (event.pageY - 28) + "px");
      })
      .on("mouseout", function(event, d) {
        tooltip.transition()
          .duration(500)
          .style("opacity", 0);
      });

      arcs.append("text")
      .attr("transform", d => `translate(${labelArc.centroid(d)})`)
      .attr("dy", ".35em")
      .text(d => d.data.value > 4 ? `${d.data.label}` : '');
  }, []);

  return (
    <>
    <style>{`
    .pie-chart-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

svg {
  width: 100%;
  height: 100%;
}

.tooltip-c {
  position: absolute;
  top:0;
  left:0;
  text-align: center;
  width: 120px;
  height: 28px;
  padding: 2px;
  font: 12px sans-serif;
  background: lightsteelblue;
  border: 0px;
  border-radius: 8px;
  pointer-events: none;
}
`}</style>
    <div className="pie-chart-container">
      <svg ref={ref} />
    </div>
    </>
  );
};

export default IcelandicTourism;
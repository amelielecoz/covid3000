import React, { useRef } from "react";
import * as d3 from "d3";

import "./BarChart.css";

const BarChart = ({ history }) => {
  /* D3 Practice*/
  const DAY_HISTORY = 10;
  const svgWidth = 343;
  const svgHeight = 170;
  const svgEl = useRef(null);

  // Set of data to work with
  const historyHosp = history
    .slice(history.length - DAY_HISTORY, history.length)
    .map((d) => ({ jour: d.jour, hosp: d.hosp }));

  // Prepare displayable data
  const xScale = d3.scaleBand().domain(historyHosp.keys()).range([0, svgWidth]);
  //.padding(0.1); // fix padding for now

  const max = d3.max(historyHosp, (d) => d.hosp);
  const min = d3.min(historyHosp, (d) => d.hosp) - 40; //

  const yScale = d3.scaleLinear().domain([min, max]).range([svgHeight, 0]);

  // separate array of raw data from array of visualisation (best practices) avoid mutation etc..
  // in this case historyHosp is a simple array of hospitalisation numbers, so we keep it simple with data array = visualisation array

  const t = d3.select(svgEl.current).transition().duration(100);

  // updating
  const g = d3.select(svgEl.current).selectAll("g").data(historyHosp);
  g.select("rect")
    .attr("height", (d) => svgHeight - yScale(d.hosp))
    .attr("y", (d) => yScale(d.hosp))
    .attr("width", xScale.bandwidth())
    .attr("x", (d, i) => xScale(i))
    .attr("stroke-width", 3)
    .attr("stroke", "blue")
    .attr("fill", "blue")
    .attr("fill-opacity", ".6");
  g.select(".nbHosp").text((d) => d.hosp);
  g.select(".jour").text((d) => d.jour);

  // entering, just once the first time it loads, then only requested (height and y) will be updated
  const target = g
    .enter()
    .append("g")
    .attr("x", (d, i) => xScale(i));
  target
    .append("rect")
    .attr("y", (d) => yScale(d.hosp))
    .attr("width", xScale.bandwidth())
    .attr("height", (d) => svgHeight - yScale(d.hosp));
  target
    .append("text")
    .classed("nbHosp", true)
    .text((d) => d.hosp)
    .attr("x", (d, i) => xScale(i) + xScale.bandwidth() / 2)
    .attr("y", svgHeight);
  target
    .append("text")
    .classed("jour", true)
    .text((d) => d.jour);

  // removing
  console.log(g.exit());
  g.exit().remove(); //data that exits the initial array

  return (
    <svg className="" ref={svgEl} height={svgHeight} width={svgWidth}></svg>
  );
};

export default BarChart;

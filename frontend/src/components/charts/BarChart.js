import React, { useRef } from "react";
import * as d3 from "d3";

import "./BarChart.css";

const BarChart = ({ history }) => {
  /* D3 Practice*/
  const svgWidth = 343;
  const svgHeight = 170;
  const svgEl = useRef(null);

  // Set of data to work with
  // TODO : we should keep the date here to have the right data 'reference' in d3, have to dig currently looking courses on FEM
  const historyHosp = history
    .slice(history.length - 10, history.length)
    .map((d) => d.hosp);

  // Prepare displayable data
  const xScale = d3
    .scaleBand()
    .domain(historyHosp.keys())
    .range([0, svgWidth])
    .padding(0.1); // fix padding for now

  const [min, max] = d3.extent(historyHosp, (d) => d);

  const yScale = d3.scaleLinear().domain([min, max]).range([svgHeight, 0]);

  // separate array of raw data from array of visualisation (best practices) avoid mutation etc..
  // in this case historyHosp is a simple array of hospitalisation numbers, so we keep it simple with data array = visualisation array

  const t = d3.select(svgEl.current).transition().duration(1000);
  d3.select(svgEl.current)
    .selectAll("rect")
    .data(historyHosp, (d) => d)
    .join(
      (enter) => {
        return enter.append("rect").attr("y", svgHeight).attr("height", 0);
      },
      (update) => update,
      (exit) => {
        exit
          .transition(t)
          // everything after here is transition TO
          .attr("y", svgHeight)
          .attr("height", 0);
      }
    )
    .attr("x", (d, i) => xScale(i))
    .attr("y", (d) => yScale(d))
    .attr("width", xScale.bandwidth())
    .transition(t)
    .attr("height", (d) => svgHeight - yScale(d));

  // .attr("stroke-width", 3)
  // .attr(
  //   "stroke-dasharray",
  //   `${Math.floor(Math.random() * 6) + 1} ${
  //     Math.floor(Math.random() * 6) + 1
  //   }`
  // )
  // .attr("stroke", "plum");

  return (
    <svg className="" ref={svgEl} height={svgHeight} width={svgWidth}></svg>
  );
};

export default BarChart;

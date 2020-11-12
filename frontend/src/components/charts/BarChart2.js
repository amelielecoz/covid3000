// JOIN() ENTER/UPDATE/EXIT D3 PATTERN

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
  const historyHosp = history.slice(
    history.length - DAY_HISTORY,
    history.length
  );

  // Prepare displayable data
  const xScale = d3.scaleBand().domain(historyHosp.keys()).range([0, svgWidth]);
  //.padding(0.1); // fix padding for now

  const max = d3.max(historyHosp, (d) => d.hosp);
  const min = d3.min(historyHosp, (d) => d.hosp); // TODO Change the range of min to have something displayable

  const yScale = d3
    .scaleLinear()
    .domain([min, max])
    .range([(svgHeight * 80) / 100, 0]);

  // separate array of raw data from array of visualisation (best practices) avoid mutation etc..
  // in this case historyHosp is a simple array of hospitalisation numbers, so we keep it simple with data array = visualisation array

  const t = d3.select(svgEl.current).transition().duration(1000);

  const g = d3
    .select(svgEl.current)
    .selectAll("g")
    .data(historyHosp)
    .join(
      (enter) => {
        const g = enter.append("g");
        g.attr("transform", (d, i) => `translate(${xScale(i)})`);
        g.append("rect")
          .attr("y", (d) => yScale(d.hosp))
          .attr("width", xScale.bandwidth())
          .attr("height", (d) => svgHeight - yScale(d.hosp));
        g.append("text")
          .classed("nbHosp", true)
          .text((d) => d.hosp)
          .attr("x", (d) => 7)
          .attr(
            "transform",
            (d, i) => `translate(0, ${(svgHeight + yScale(d.hosp)) / 2})`
          );
        g.append("text")
          .classed("jour", true)
          .text((d) => d.jour);
        return g;
      },
      (update) => {
        update
          .select("rect")
          .attr("height", (d) => svgHeight - yScale(d.hosp))
          .attr("y", (d) => yScale(d.hosp))
          .attr("width", xScale.bandwidth())
          // .attr("x", (d, i) => xScale(i))
          .attr("stroke-width", 1)
          .attr("stroke", "blue")
          .attr("fill", "blue")
          .attr("fill-opacity", ".6");
        update
          .select(".nbHosp")
          .text((d) => d.hosp)
          .attr(
            "transform",
            (d, i) => `translate(0, ${(svgHeight + yScale(d.hosp)) / 2})`
          );
        update.select(".jour").text((d) => d.jour);
      },
      (exit) => {
        exit.remove(); //data that exits the initial array
      }
    );

  return (
    <svg className="" ref={svgEl} height={svgHeight} width={svgWidth}></svg>
  );
};

export default BarChart;

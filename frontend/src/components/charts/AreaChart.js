// JOIN() ENTER/UPDATE/EXIT D3 PATTERN

import React, { useRef, useEffect, useContext } from "react";

import GraphContext from "../../context/graphContext";
import * as d3 from "d3";

import "./BarChart.css";

const BarChart = ({ dataSet }) => {
  const { type } = useContext(GraphContext);

  /* D3 Practice*/
  const svgWidth = 343;
  const svgHeight = 170;
  const svgEl = useRef(null);
  const pathEl = useRef(null);

  const margin = { top: 20, right: 30, bottom: 30, left: 40 };

  // Set of data to work with
  const data = dataSet
    .slice()
    .map(({ jour, value }) => ({ jour: new Date(jour), value }));

  useEffect(() => {
    // console.log("Starting");
    const [min, max] = d3.extent(data, (d) => d.jour);

    const x = d3
      .scaleUtc()
      .domain([new Date(min), new Date(max)])
      .range([margin.left, svgWidth - margin.right]);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value)])
      .nice()
      .range([svgHeight - margin.bottom, margin.top]);

    const xAxis = (g) =>
      g.attr("transform", `translate(0,${svgHeight - margin.bottom})`).call(
        d3
          .axisBottom(x)
          .ticks(svgWidth / 25)
          .tickSizeOuter(0)
      );

    const yAxis = (g) =>
      g
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y))
        .call((g) => g.select(".domain").remove());

    // const line = d3
    //   .line()
    //   .defined((d) => !isNaN(d.value))
    //   .x((d) => x(new Date(d.jour)))
    //   .y((d) => y(d.value));

    const area = d3
      .area()
      .curve(d3.curveLinear)
      .x((d) => x(new Date(d.jour)))
      .y0(y(0))
      .y1((d) => y(d.value));

    const svg = d3
      .select(svgEl.current)
      .attr("viewBox", [0, 0, svgWidth, svgHeight])
      .style("-webkit-tap-highlight-color", "transparent")
      .style("overflow", "visible");

    svg.select(".xAxis").call(xAxis);

    svg.select(".yAxis").call(yAxis);

    d3.select(pathEl.current)
      .datum(data)
      .attr("fill", getColor(type))
      .classed("show", true)
      // .attr("stroke", "red")
      // .attr("stroke-width", 0.5)
      //   .attr("stroke-linejoin", "round")
      //   .attr("stroke-linecap", "round")
      .attr("d", area);

    //TOOLTIP
    const tooltip = svg.append("g");
    svg.on("touchmove mousemove", function (event) {
      const { jour, value } = bisect(d3.pointer(event, this)[0]);
      console.log(jour);
      console.log(value);

      tooltip.attr("transform", `translate(${x(jour)},${y(value)})`).call(
        callout,
        `${value}
      ${formatDate(jour)}`
      );
    });

    svg.on("touchend mouseleave", () => tooltip.call(callout, null));

    const bisectDate = d3.bisector((d) => d.jour).left;
    function bisect(mx) {
      const jour = x.invert(mx);
      const index = bisectDate(data, jour, 1);
      const a = data[index - 1];
      const b = data[index];
      return b && jour - a.jour > b.jour - jour ? b : a;
    }
  }, [svgEl, data]);

  return (
    <div>
      <div
        className={`inline-block rounded px-1  text-xs text-white ${getColor(
          type
        )}`}
      >
        Hospitalisations
      </div>
      <svg ref={svgEl}>
        <g className="xAxis"></g>
        <g className="yAxis"></g>
        <path ref={pathEl} fill={getColor(type)}></path>
      </svg>
    </div>
  );
};

export default BarChart;

// HELPERS

const callout = (g, value) => {
  if (!value) return g.style("display", "none");

  g.style("display", null).style("pointer-events", "none").attr("class");

  const path = g
    .selectAll("path")
    .data([null])
    .join("path")
    .attr("fill", "white")
    .attr("stroke", "black");

  const text = g
    .selectAll("text")
    .data([null])
    .join("text")
    .call((text) =>
      text
        .selectAll("tspan")
        .data((value + "").split(/\n/))
        .join("tspan")
        .attr("x", 0)
        .attr("y", (d, i) => `${i * 1.1}em`)
        .style("font-weight", (_, i) => (i ? null : "bold"))
        .text((d) => d)
    );

  const { x, y, width: w, height: h } = text.node().getBBox();

  text.attr("transform", `translate(${-w / 2},${15 - y})`);
  path.attr(
    "d",
    `M${-w / 2 - 10},5H-5l5,-5l5,5H${w / 2 + 10}v${h + 20}h-${w + 20}z`
  );
};

function formatDate(date) {
  return date.toLocaleString("fr", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

function getColor(type) {
  switch (type) {
    case "hosp":
      return "#2D3748";
    case "rea":
      return "#2D3748";
    case "dc":
      return "#2D3748";
    case "rad":
      return "#2D3748";
    case "T":
      return "#2D3748";
    case "P":
      return "#2D3748";
    default:
      return "black";
  }
}

// JOIN() ENTER/UPDATE/EXIT D3 PATTERN

import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

import "./BarChart.css";

const BarChart = ({ history }) => {
  /* D3 Practice*/
  const DAY_HISTORY = 365;
  const svgWidth = 343;
  const svgHeight = 170;
  const svgEl = useRef(null);
  const pathEl = useRef(null);

  const margin = { top: 20, right: 30, bottom: 30, left: 40 };

  // Set of data to work with
  const historyHosp = history
    .slice()
    .map(({ jour, hosp }) => ({ jour: new Date(jour), hosp }));

  useEffect(() => {
    // console.log("Starting");
    const [min, max] = d3.extent(historyHosp, (d) => d.jour);

    const x = d3
      .scaleUtc()
      .domain([new Date(min), new Date(max)])
      .range([margin.left, svgWidth - margin.right]);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(historyHosp, (d) => d.hosp)])
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
        .call((g) => g.select(".domain").remove())
        .call((g) =>
          g
            .select(".tick:last-of-type text")
            .clone()
            .attr("x", 3)
            .attr("text-anchor", "start")
            .attr("font-weight", "bold")
            .text("hosp")
        );

    // const line = d3
    //   .line()
    //   .defined((d) => !isNaN(d.hosp))
    //   .x((d) => x(new Date(d.jour)))
    //   .y((d) => y(d.hosp));

    const area = d3
      .area()
      .curve(d3.curveLinear)
      .x((d) => x(new Date(d.jour)))
      .y0(y(0))
      .y1((d) => y(d.hosp));

    const svg = d3
      .select(svgEl.current)
      .attr("viewBox", [0, 0, svgWidth, svgHeight])
      .style("-webkit-tap-highlight-color", "transparent")
      .style("overflow", "visible");

    svg.select(".xAxis").call(xAxis);

    svg.select(".yAxis").call(yAxis);

    d3.select(pathEl.current)
      .datum(historyHosp)
      .attr("fill", "steelblue")
      //   .attr("stroke", "steelblue")
      //   .attr("stroke-width", 0.5)
      //   .attr("stroke-linejoin", "round")
      //   .attr("stroke-linecap", "round")
      .attr("d", area);

    //TOOLTIP
    const tooltip = svg.append("g");
    svg.on("touchmove mousemove", function (event) {
      //   const currentXposition = d3.pointer(event, this)[0];
      //   const time = x.invert(currentXposition);
      //   const bisectDate = d3.bisector((d) => d.jour).left;
      //   const dataIndex = bisectDate(historyHosp, time, 1);
      //   console.log(dataIndex);

      const { jour, hosp } = bisect(d3.pointer(event, this)[0]);
      console.log(jour);
      console.log(hosp);

      tooltip.attr("transform", `translate(${x(jour)},${y(hosp)})`).call(
        callout,
        `${formatValue(hosp)}
      ${formatDate(jour)}`
      );
    });

    // svg.on("touchend mouseleave", () => tooltip.call(callout, null));

    // // ** Extra code here ** //
    const bisectDate = d3.bisector((d) => d.jour).left;
    function bisect(mx) {
      const jour = x.invert(mx);
      const index = bisectDate(historyHosp, jour, 1);
      const a = historyHosp[index - 1];
      const b = historyHosp[index];
      return b && jour - a.jour > b.jour - jour ? b : a;
    }
  }, [svgEl, historyHosp]);

  return (
    <svg ref={svgEl}>
      <g className="xAxis"></g>
      <g className="yAxis"></g>
      <path ref={pathEl}></path>
    </svg>
  );
};

export default BarChart;

// HELPERS

const callout = (g, value) => {
  if (!value) return g.style("display", "none");

  g.style("display", null)
    .style("pointer-events", "none")
    .style("font", "5px sans-serif");

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

function formatValue(value) {
  return value;
}

function formatDate(date) {
  return date.toLocaleString("fr", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

import React, { useContext, useRef } from "react";

import * as d3 from "d3";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";

import DailySummary from "../DailySummary";
import HistoryRow from "../HistoryRow";
import LineChart from "../charts/LineChart";
import SelectSexe from "../SelectSexe";
import SelectDepartement from "../SelectDepartement";

import { getHospitalsData, getHistory } from "../../selectors/hospitals";
import FiltersContext from "../../context/filtersContext";

import "./Dashboard.css";

const Dashboard = ({ hospitalsGlobalData }) => {
  const { sexe, departement, startDate, setStartDate } = useContext(
    FiltersContext
  );

  let history = getHistory(
    hospitalsGlobalData,
    startDate,
    365,
    sexe,
    departement
  );
  console.log("perf1");
  let hospitalsData = getHospitalsData(
    hospitalsGlobalData,
    "2020-11-04",
    sexe,
    departement
  ); // hardcoded day | to be chosen in a selector
  console.log("perf2");
  let hospitalsDataDayBefore = getHospitalsData(
    hospitalsGlobalData,
    "2020-11-03",
    sexe,
    departement
  ); // hardcoded day | to be day - 1 from the previous one
  console.log("perf3");
  const delta = {
    hosp: hospitalsData.hosp - hospitalsDataDayBefore.hosp,
    rea: hospitalsData.rea - hospitalsDataDayBefore.rea,
    dc: hospitalsData.dc - hospitalsDataDayBefore.dc,
    rad: hospitalsData.rad - hospitalsDataDayBefore.rad,
  };

  /* D3 Practice*/
  const svgWidth = 343;
  const svgHeight = 170;
  const svgEl = useRef(null);
  // const displayHistoryHosp = history
  //   .slice(history.length - 10, history.length)
  //   .map((d) => d.hosp);

  // console.log(displayHistoryHosp);
  // const xScale = d3
  //   .scaleBand()
  //   .domain(displayHistoryHosp.keys())
  //   .range([0, svgWidth])
  //   .padding(0.1); // fix padding for now

  // const [min, max] = d3.extent(displayHistoryHosp, (d) => d);

  // const yScale = d3.scaleLinear().domain([min, max]).range([svgHeight, 0]);

  // setInterval(() => {
  //   d3.select(svgEl.current)
  //     .selectAll("rect")
  //     .data(displayHistoryHosp)
  //     .enter()
  //     .append("rect")
  //     .attr("x", (d, i) => xScale(i))
  //     .attr("y", (d) => yScale(d))
  //     .attr("height", (d) => svgHeight - yScale(d))
  //     .attr("width", xScale.bandwidth())
  //     .attr("fill", "black")
  //     .attr("stroke-width", 3)
  //     .attr(
  //       "stroke-dasharray",
  //       `${Math.floor(Math.random() * 6) + 1} ${
  //         Math.floor(Math.random() * 6) + 1
  //       }`
  //     )
  //     .attr("stroke", "plum");
  // }, 1000);

  return (
    <div className="container mx-auto">
      {/* React Day Picker here http://react-day-picker.js.org/examples/input-date-fns */}
      <div className="flex flex-row justify-between items-center ">
        <div className="ml-4 text-gray-800 text-lg">
          <DayPickerInput
            placeholder={startDate.toLocaleDateString("fr-Fr")}
            fromMonth={new Date(2020, 3)}
            toMonth={new Date()}
            onDayChange={(day) => setStartDate(day)}
          />
        </div>
        <img className="h-12" src="logoSimple.png" alt="covid logo" />
      </div>

      {/* filters */}
      <div className="flex h-8 bg-gray-100 text-xs pt-1">
        <SelectSexe />
        <SelectDepartement />
      </div>
      {/* main infos */}
      <div className="mx-4 my-4">
        <DailySummary hospitalsData={hospitalsData} delta={delta} />
      </div>
      <div className="mx-4">
        <LineChart history={history} />
      </div>
      {/* d3 practice */}
      <svg
        className="bg-gray-300 mx-4"
        ref={svgEl}
        height={svgHeight}
        width={svgWidth}
      ></svg>
      {/* history */}
      <div>
        {history
          .slice()
          .reverse()
          .map((data) => (
            <HistoryRow data={data} key={data.jour} />
          ))}
      </div>
    </div>
  );
};

export default Dashboard;

import React, { useContext, useState } from "react";

import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";

import HistoryRow from "../HistoryRow";
import LineChart from "../charts/LineChart";
import SelectSexe from "../SelectSexe";
import SelectDepartement from "../SelectDepartement";

import { getHospitalsData, getHistory } from "../../selectors/hospitals";
import FiltersContext from "../../context/filtersContext";
import DailySummary from "../DailySummary";

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
    "2020-10-28",
    sexe,
    departement
  ); // hardcoded day | to be chosen in a selector
  console.log("perf2");
  let hospitalsDataDayBefore = getHospitalsData(
    hospitalsGlobalData,
    "2020-10-27",
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

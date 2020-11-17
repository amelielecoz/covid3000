import React, { useContext, useState } from "react";

import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";

import AreaChart from "../charts/AreaChart";
import DailySummary from "../DailySummary";
// import HistoryRow from "../HistoryRow";
// import LineChart from "../charts/LineChart";
import SelectSexe from "../SelectSexe";
import SelectDepartement from "../SelectDepartement";

import { getHistory } from "../../selectors/hospitals";
import { getTestsData } from "../../selectors/tests";
import FiltersContext from "../../context/filtersContext";
import GraphContext from "../../context/graphContext";

import "./Dashboard.css";

const Dashboard = ({ hospitalsGlobalData, testsGlobalData }) => {
  const {
    sexe,
    departement,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
  } = useContext(FiltersContext);
  const { type } = useContext(GraphContext);

  const history = getHistory(
    hospitalsGlobalData,
    startDate,
    endDate,
    sexe,
    departement
  );
  const endDateHospitalData = history[history.length - 1];
  const endDateDayBeforeHospitalData =
    history.length >= 2 ? history[history.length - 2] : endDateHospitalData;

  const delta = {
    hosp: endDateHospitalData.hosp - endDateDayBeforeHospitalData.hosp,
    rea: endDateHospitalData.rea - endDateDayBeforeHospitalData.rea,
    dc: endDateHospitalData.dc - endDateDayBeforeHospitalData.dc,
    rad: endDateHospitalData.rad - endDateDayBeforeHospitalData.rad,
  };

  const tests = getTestsData(testsGlobalData, startDate, endDate, departement);
  const endDateTests = tests.length >= 1 ? tests[tests.length - 1] : null;
  const endDateDayBeforeTests =
    tests.length >= 2 ? tests[tests.length - 2] : endDateTests;

  console.log(tests);

  const deltaTests = {
    P: endDateDayBeforeTests.P - endDateTests.P,
    T: endDateDayBeforeTests.T - endDateTests.T,
  };

  const dataChart = (data, type) => {
    return data.map((datum) => {
      let newObj = {};
      newObj.jour = datum.jour;
      newObj.value = datum[type];
      return newObj;
    });
    // value for the chart
  };

  return (
    <div className="container mx-auto">
      {/* React Day Picker here http://react-day-picker.js.org/examples/input-date-fns */}
      <div className="flex flex-row justify-between">
        <div className="flex flex-row">
          <div className="ml-4 text-gray-800 text-lg">
            <div className="text-xs">Start Date</div>
            <DayPickerInput
              placeholder={startDate.toLocaleDateString("fr-Fr")}
              fromMonth={new Date(2020, 3)}
              toMonth={new Date()}
              onDayChange={(day) => setStartDate(day)}
            />
          </div>
          <div className="ml-4 text-gray-800 text-lg">
            <div className="text-xs">End Date</div>
            <DayPickerInput
              placeholder={endDate.toLocaleDateString("fr-Fr")}
              fromMonth={new Date(2020, 3)}
              toMonth={new Date()}
              onDayChange={(day) => setEndDate(day)}
            />
          </div>
        </div>
        {/* <img className="h-12" src="logoSimple.png" alt="covid logo" /> */}
      </div>

      {/* filters */}
      <div className="flex h-8 bg-gray-100 text-xs pt-1">
        <SelectSexe />
        <SelectDepartement />
      </div>
      {/* main infos */}
      <div className="mx-4 my-4">
        <DailySummary
          hospitalsData={endDateHospitalData}
          delta={delta}
          tests={endDateTests}
          deltaTests={deltaTests}
        />
      </div>
      {/* <div className="mx-4">
        <LineChart history={history} />
      </div> */}
      {/* d3 practice */}
      <div className="mx-4">
        <AreaChart dataSet={dataChart(history, type)} />
      </div>
      {/* history */}
      {/* <div>
        {history
          .slice()
          .reverse()
          .map((data) => (
            <HistoryRow data={data} key={data.jour} />
          ))}
      </div> */}
    </div>
  );
};

export default Dashboard;

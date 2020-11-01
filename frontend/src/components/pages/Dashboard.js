import React, { useContext, useState } from "react";

import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";

import HistoryRow from "../HistoryRow";
import SelectSexe from "../SelectSexe";
import SelectDepartement from "../SelectDepartement";

import { getHospitalsData, getHistory } from "../../selectors/hospitals";
import FiltersContext from "../../context/filtersContext";
import DailySummary from "../DailySummary";

const Dashboard = () => {
  const { sexe, departement } = useContext(FiltersContext);
  const [startDate, setStartDate] = useState(new Date());

  let history = getHistory("2020-10-28", 10, sexe, departement); // hardcoded history (but selector code is valid, may move server side)
  let hospitalsData = getHospitalsData("2020-10-28", sexe, departement); // hardcoded day | to be chosen in a selector
  let hospitalsDataDayBefore = getHospitalsData(
    "2020-10-27",
    sexe,
    departement
  ); // hardcoded day | to be day - 1 from the previous one
  const delta = {
    hosp: hospitalsData.hosp - hospitalsDataDayBefore.hosp,
    rea: hospitalsData.rea - hospitalsDataDayBefore.rea,
    dc: hospitalsData.dc - hospitalsDataDayBefore.dc,
    rad: hospitalsData.rad - hospitalsDataDayBefore.rad,
  };

  return (
    <div className="container mx-auto">
      {/* React Day Picker here http://react-day-picker.js.org/examples/input-date-fns */}
      <div className="mx-4">
        <DayPickerInput
          placeholder="28/10/2020"
          onDayChange={(day) => console.log(day)}
        />
      </div>

      {/* filters */}
      <div className="flex h-8 bg-gray-100 text-xs pt-1">
        <SelectSexe />
        <SelectDepartement />
      </div>
      {/* main infos */}
      <div className="mx-4">
        <DailySummary hospitalsData={hospitalsData} delta={delta} />
      </div>
      <div className="text-xs text-gray-500 bg-gray-300 mx-4 h-40 flex items-center justify-center">
        chart placeholder chart.js
      </div>
      {/* <canvas id="myChart"></canvas>*/}
      {/* history */}
      <div>
        {history.map((data) => (
          <HistoryRow data={data} key={data.jour} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

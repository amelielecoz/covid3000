import React, { useContext } from "react";


import SelectSexe from "../SelectSexe";
import SelectDepartement from "../SelectDepartement";
import HistoryRow from "../HistoryRow";

import { getHospitalsData, getHistory } from "../../selectors/hospitals";
import FiltersContext from "../../context/filtersContext";
import DailySummary from "../DailySummary";

const Dashboard = () => {
  const { sexe, departement, setDepartement } = useContext(FiltersContext);

  let history = getHistory("2020-10-28", 10, sexe, departement); // hardcoded history (but selector code is valid, may move server side)
  let hospitalsData = getHospitalsData("2020-10-28", sexe); // hardcoded day | to be chosen in a selector
  let hospitalsDataDayBefore = getHospitalsData("2020-10-27", sexe); // hardcoded day | to be day - 1 from the previous one
  const delta = {
    hosp: hospitalsData.hosp - hospitalsDataDayBefore.hosp,
    rea: hospitalsData.rea - hospitalsDataDayBefore.rea,
    dc: hospitalsData.dc - hospitalsDataDayBefore.dc,
    rad: hospitalsData.rad - hospitalsDataDayBefore.rad,
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl pl-4 font-semibold bg-gray-800 text-white shadow">
        Today, Oct 28
      </h2>
      {/* filters */}
      <div className="flex h-8 bg-gray-100 text-xs pt-1">
        <SelectSexe />
        <SelectDepartement />
      </div>
      {/* main infos */}
      <DailySummary hospitalsData={hospitalsData} delta={delta} />

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

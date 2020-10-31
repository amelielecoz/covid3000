import React, { useState, useEffect } from "react";

import CounterCard from "../CounterCard";
import HistoryRow from "../HistoryRow";

import { getHospitalsData, getHistory } from "../../selectors/hospitals";

const Dashboard = () => {
  // Filtres, pour l'instant simple, potentiellement à mettre dans un reducer
  const [sexe, setSexe] = useState(0); // default 0 = all
  const [departement, setDepartement] = useState(0); // default 0 = all

  let history = getHistory("2020-10-28"); // hardcoded history (but selector code is valid, may move server side)
  const hospitalsData = getHospitalsData("2020-10-28"); // hardcoded day | to be chosen in a selector
  const hospitalsDataDayBefore = getHospitalsData("2020-10-27"); // hardcoded day | to be day - 1 from the previous one
  const delta = {
    hosp: hospitalsData.hosp - hospitalsDataDayBefore.hosp,
    rea: hospitalsData.rea - hospitalsDataDayBefore.rea,
    dc: hospitalsData.dc - hospitalsDataDayBefore.dc,
    rad: hospitalsData.rad - hospitalsDataDayBefore.rad,
  };

  // useEffect(() => {
  //   console.log("sexe changed");
  //   history = getHistory("2020-10-27");
  // }, [sexe]);
  //

  const handleChangeSexe = (e) => {
    console.log("handleChangeSexe");
    switch (e.target.value) {
      case "hommes":
        console.log("hommes");
        setSexe(1);
        break;
      case "femmes":
        console.log("femmes");
        setSexe(2);
        break;
      default:
        setSexe(0);
    }
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl pl-4 font-semibold bg-gray-800 text-white shadow">
        Today, Oct 28
      </h2>
      {/* filters */}
      <div className="h-8 bg-gray-100 text-xs pt-1">
        <div className="ml-4">
          <label htmlFor="sexe">Sexe</label>
          <div className="inline-block relative w-20 ml-1">
            <select
              onChange={handleChangeSexe}
              name="sexe"
              className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-2 py-1 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="tous">Tous</option>
              <option value="hommes">Hommes</option>
              <option value="femmes">Femmes</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      {/* main infos */}
      <div className="grid gap-4 grid-cols-3 p-4 border-b shadow">
        <CounterCard
          number={hospitalsData.hosp}
          delta={delta.hosp}
          text="hospitalisations"
        />
        <CounterCard
          number={hospitalsData.rea}
          delta={delta.rea}
          text="réanimations"
        />
        <CounterCard number={hospitalsData.dc} delta={delta.dc} text="décès" />
        <CounterCard
          number={hospitalsData.rad}
          delta={delta.rad}
          text="retours"
        />
      </div>

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

import React from "react";

import CounterCard from "../CounterCard";

import { getHospitalsData } from "../../selectors/hospitals";

const Dashboard = () => {
  const hospitalsData = getHospitalsData("2020-10-28"); // hardcoded day | to be chosen in a selector
  const hospitalsDataDayBefore = getHospitalsData("2020-10-27"); // hardcoded day | to be day - 1 from the previous one
  const delta = {
    hosp: hospitalsData.hosp - hospitalsDataDayBefore.hosp,
    rea: hospitalsData.rea - hospitalsDataDayBefore.rea,
    dc: hospitalsData.dc - hospitalsDataDayBefore.dc,
    rad: hospitalsData.rad - hospitalsDataDayBefore.rad,
  };
  return (
    <div className="container mx-auto bg-gray-100">
      <h2 className="text-2xl pl-4 font-semibold bg-white">Today, Oct 28</h2>
      <div className="grid gap-4 grid-cols-3 p-4">
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
    </div>
  );
};

export default Dashboard;

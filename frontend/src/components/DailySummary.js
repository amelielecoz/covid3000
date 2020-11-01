import React from "react";

import CounterCard from "./CounterCard";

const DailySummary = ({ hospitalsData, delta }) => {
  return (
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
  );
};

export default DailySummary;

import React from "react";

import CounterCard from "./CounterCard";

const DailySummary = ({ hospitalsData, delta, tests, deltaTests }) => {
  return (
    <div className="grid gap-4 grid-cols-3">
      <CounterCard
        number={hospitalsData.hosp}
        delta={delta.hosp}
        text="hosp."
        type="hosp"
      />
      <CounterCard
        number={hospitalsData.rea}
        delta={delta.rea}
        text="réanimations"
        type="rea"
      />
      <CounterCard number={hospitalsData.dc} delta={delta.dc} text="décès" type="dc"/>
      <CounterCard
        number={hospitalsData.rad}
        delta={delta.rad}
        text="retours"
        type="rad"
      />
      <CounterCard number={tests.T} delta={deltaTests.T} text="tests" type="T" />
      <CounterCard number={tests.P} delta={deltaTests.P} text="Positifs" type="P" />
    </div>
  );
};

export default DailySummary;

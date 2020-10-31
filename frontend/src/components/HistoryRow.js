import React from "react";

const HistoryRow = ({ data }) => {
  return (
    <div className="flex flex-row text-xs items-center bg-gray-200 mt-2 h-24">
      {data.jour}
      <span className="ml-2">hosp: {data.hosp}</span>
      <span className="ml-2">rea: {data.rea}</span>
      <span className="ml-2">dc: {data.dc}</span>
      <span className="ml-2">rad: {data.rad}</span>
    </div>
  );
};

export default HistoryRow;

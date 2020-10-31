import React from "react";

const HistoryRow = ({ data }) => {
  return (
    <div className="flex flex-row items-center bg-gray-200 mt-2 h-24">
      {data.jour}
    </div>
  );
};

export default HistoryRow;

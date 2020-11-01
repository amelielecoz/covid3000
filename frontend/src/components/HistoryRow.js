import React from "react";

const HistoryRow = ({ data }) => {
  const displayDate = new Date(data.jour).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="flex relative text-xs items-center bg-gray-200 mt-2 h-24">
      <span className="absolute top-0 ml-1 font-bold text-gray-600">
        {displayDate}
      </span>
      <div className="flex items-center ml-2">
        <svg
          className="h-3 w-3"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="#4A5568" //bg-gray-700
        >
          <path d="M17 10.27V4.99a1 1 0 0 0-2 0V15a5 5 0 0 1-10 0v-1.08A6 6 0 0 1 0 8V2C0 .9.9 0 2 0h1a1 1 0 0 1 1 1 1 1 0 0 1-1 1H2v6a4 4 0 1 0 8 0V2H9a1 1 0 0 1-1-1 1 1 0 0 1 1-1h1a2 2 0 0 1 2 2v6a6 6 0 0 1-5 5.92V15a3 3 0 0 0 6 0V5a3 3 0 0 1 6 0v5.27a2 2 0 1 1-2 0z" />
        </svg>
        <span className="inline-block text-xs ml-1">{data.hosp}</span>
      </div>
      <span className="ml-2">rea: {data.rea}</span>
      <span className="ml-2">dc: {data.dc}</span>
      <span className="ml-2">rad: {data.rad}</span>
    </div>
  );
};

export default HistoryRow;

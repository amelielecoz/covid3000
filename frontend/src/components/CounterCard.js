import React, { useContext } from "react";

import GraphContext from "../context/filtersContext";

const Counter = ({ number, delta, text, type }) => {
  const { setType } = useContext(GraphContext);
  const frenchFormatter = new Intl.NumberFormat("fr-FR");

  // #TODO
  // RENDRE DYNAMIQUE LES COULEURS DE BORDURES et le svg conditionnel selon le delta
  const getColor = (type) => {
    if (delta < 0 || text === "retours" || text === "tests") {
      if (type === "text") return "text-green-500";
      if (type === "border") return "border-green-500";
      return "#48BB78";
    }
    if (delta > 0) {
      if (type === "text") return "text-red-500";
      if (type === "border") return "border-red-500";
      return "#C53030";
    } // delta === 0
    else {
      if (type === "text") return "text-yellow-500";
      if (type === "border") return "border-yellow-500";
      return "#ECC94B";
    }
  };

  return (
    <div
      onClick={() => {
        setType(type);
        console.log("type");
      }}
      className={`w-24 pb-1  bg-white rounded shadow border-b-4 ${getColor(
        "border"
      )} text-center`}
    >
      <div className="h-2 text-xs text-gray-700 font-semibold">{text}</div>
      <div className="my-1">
        <svg
          className="h-3 w-3 inline "
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill={getColor()}
        >
          <path d="M7 10v8h6v-8h5l-8-8-8 8h5z" />
        </svg>
        <span className={`text-xs ${getColor("text")}`}>
          ({frenchFormatter.format(delta)})
        </span>
      </div>
      <div className="h-4 -mt-2">{frenchFormatter.format(number)}</div>
    </div>
  );
};

export default Counter;

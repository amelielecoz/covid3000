import React from "react";

const Counter = ({ number, delta, text }) => {
  const frenchFormatter = new Intl.NumberFormat("fr-FR");

  const getColor = (type) => {
    if (delta < 0 || text === "retours") {
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

  // #TODO
  // RENDRE DYNAMIQUE LES COULEURS DE BORDURES et le svg conditionnel selon le delta

  return (
    <div
      className={`w-24 h-20 bg-white rounded shadow border-b-4 ${getColor(
        "border"
      )} text-center`}
    >
      <div className="text-xs text-gray-700 font-semibold">{text}</div>
      <svg
        className="h-3 w-3 inline"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill={getColor()}
      >
        <path d="M7 10v8h6v-8h5l-8-8-8 8h5z" />
      </svg>
      <span className={`text-xs ${getColor("text")}`}>
        ({frenchFormatter.format(delta)})
      </span>
      <div className="text-2xl text-black">
        <span>{frenchFormatter.format(number)}</span>
      </div>
    </div>
  );
};

export default Counter;

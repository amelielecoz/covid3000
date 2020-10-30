import React from "react";

const Counter = ({ number, delta, text }) => {
  const frenchFormatter = new Intl.NumberFormat("fr-FR");

  return (
    <div className="flex flex-col justify-around items-center w-48 rounded bg-gray-100 shadow border-b-4 border-green-500">
      <div className="text-2xl">{frenchFormatter.format(number)}</div>
      <div>({frenchFormatter.format(delta)})</div>
      <div className="text-center">{text}</div>
    </div>
  );
};

export default Counter;

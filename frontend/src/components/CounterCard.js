import React from "react";

const Counter = ({ number, delta, text }) => {
  const frenchFormatter = new Intl.NumberFormat("fr-FR");

  return (
    <div
      className={`w-24 h-20 bg-white rounded shadow border-b-4 border-red-500 text-center`}
    >
      <div className="text-xs text-gray-600 font-semibold">{text}</div>
      <svg
        className="h-3 w-3 inline"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="#C53030"
      >
        <path d="M7 10v8h6v-8h5l-8-8-8 8h5z" />
      </svg>
      <span className="text-red-700 text-xs">
        ({frenchFormatter.format(delta)})
      </span>
      <div className="text-2xl text-black">
        <span>{frenchFormatter.format(number)}</span>
      </div>
    </div>
  );
};

export default Counter;

import React, { useRef, useEffect } from "react";
import Chart from "chart.js";

const LineChart = ({ history }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const myChart = new Chart(canvasRef.current, {
      type: "line",

      data: {
        labels: history.map((data) => data.jour),
        datasets: [
          {
            label: "hospitalisations",
            data: history.map((data) => data.hosp),
            borderWidth: 1,
            fill: "none",
            borderColor: "blue",
            lineTension: 0,
            pointRadius: 0,
          },
          {
            label: "décès",
            data: history.map((data) => data.dc),
            borderWidth: 1,
            fill: "none",
            borderColor: "red",
            lineTension: 0,
            pointRadius: 0,
          },
        ],
      },
    });
  }, [history]);

  return <canvas ref={canvasRef} />;
};

export default LineChart;

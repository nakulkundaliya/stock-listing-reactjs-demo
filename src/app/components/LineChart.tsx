// components/LineChart.js
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ chartData, height = 100, width = 300 }: any) => {
  const options: any = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      outerWidth: 200,
      title: {
        display: true,
        text: "Stock Price",
      },
    },
  };

  return (
    <Line data={chartData} options={options} height={height} width={width} />
  );
};

export default LineChart;

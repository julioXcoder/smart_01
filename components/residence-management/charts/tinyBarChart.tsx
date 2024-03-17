"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    value: 2400,
  },
  {
    value: 2210,
  },
  {
    value: 2290,
  },
  {
    value: 2000,
  },
  {
    value: 2181,
  },
  {
    value: 2500,
  },
  {
    value: 2100,
  },
];

const TinyBarChart = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart width={500} height={300} data={data}>
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default TinyBarChart;

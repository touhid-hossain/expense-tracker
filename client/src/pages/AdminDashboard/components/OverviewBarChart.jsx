import { useTransaction } from "@/provider/transactionProvider";
import React, { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const Overview = () => {
  const { time, type, summaryData, fetchSummary } = useTransaction();

  useEffect(() => {
    fetchSummary();
  }, [time]);

  const renderCustomizedLabel = (props) => {
    const { x, y, width, height, value } = props;
    const radius = 10;

    return (
      <g>
        <circle cx={x + width / 2} cy={y - radius} r={radius} fill="#8884d8" />
        <text
          x={x + width / 2}
          y={y - radius}
          fill="#fff"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {value}
        </text>
      </g>
    );
  };

  function renderBar() {
    switch (type) {
      case "all":
        return (
          <>
            <Bar dataKey="income" />
            <Bar dataKey="expense" />
          </>
        );
      case "income":
      case "expense":
        return <Bar dataKey={type} />;
      default:
        return null;
    }
  }

  return (
    <div>
      {/* Chart component */}
      <ResponsiveContainer width="100%" height={350}>
        <BarChart barGap={2} barSize={60} data={summaryData}>
          <XAxis
            dataKey={time === "yearly" ? "month" : "day"}
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          {renderBar()}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Overview;

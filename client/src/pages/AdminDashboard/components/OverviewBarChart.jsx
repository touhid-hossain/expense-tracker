import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  LabelList,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";


const Overview = ({ time, type }) => {
  console.log(type)
  const [chartData, setChartData] = useState([]); // Initial data is monthly
  const [option, setOption] = useState("savings");

  const getTransactionSummary = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/v1/transaction/summary");

      setChartData(response?.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getTransactionSummary();
  }, []);

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

  return (
    <div>
      {/* Chart component */}
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={chartData}>
          <XAxis
            dataKey="monthName"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${value}`}
          />

          {
            type === "all" && (
              <>
                <Bar dataKey="income" fill="green" minPointSize={2}>
                  {/* <LabelList dataKey="income" content={renderCustomizedLabel} /> */}
                </Bar>
                <Bar dataKey="expense" fill="red" minPointSize={2} >
                  {/* <LabelList dataKey="expense" content={renderCustomizedLabel} /> */}
                </Bar>
                <Bar dataKey="savings" fill="#8884d8" minPointSize={2} >
                  {/* <LabelList dataKey="expense" content={renderCustomizedLabel} /> */}
                </Bar>
              </>
            )
          }

          {type === "income" && (
            <Bar dataKey="income" fill="green" minPointSize={2}>
              {/* <LabelList dataKey="income" content={renderCustomizedLabel} /> */}
            </Bar>
          )}

          {type === "expense" && (
            <Bar dataKey="expense" fill="red" minPointSize={2}>
              {/* <LabelList dataKey="income" content={renderCustomizedLabel} /> */}
            </Bar>
          )}

          {type === "savings" && (
            <Bar dataKey="savings" fill="#8884d8" minPointSize={2}>
              {/* <LabelList dataKey="income" content={renderCustomizedLabel} /> */}
            </Bar>
          )}

        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Overview;

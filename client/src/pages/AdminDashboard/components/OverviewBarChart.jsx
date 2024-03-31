import { useTransaction } from "@/provider/transactionProvider";
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

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 8,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 18,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

// const data = [
//   {
//     amount: 800,
//     createdAt: "2024-03-18T21:37:52.867Z",
//     type: "Income",
//   },
//   {
//     amount: 800,
//     createdAt: "2024-03-19T21:43:25.867Z",
//     type: "Income",
//   },
//   {
//     amount: 600,
//     createdAt: "2024-03-20T21:43:52.867Z",
//     type: "Expense",
//   },
//   {
//     amount: 600,
//     createdAt: "2024-03-22T21:43:55.867Z",
//     type: "Expense",
//   },
//   {
//     amount: 400,
//     createdAt: "2024-04-01T21:43:58.867Z",
//     type: "Income",
//   },
//   {
//     amount: 500,
//     createdAt: "2024-04-02T21:44:22.867Z",
//     type: "Expense",
//   },
//   {
//     amount: 500,
//     createdAt: "2024-04-03T21:45:25.867Z",
//     type: "Income",
//   },
//   {
//     amount: 900,
//     createdAt: "2024-05-11T21:46:32.867Z",
//     type: "Expense",
//   },
//   {
//     amount: 2000,
//     createdAt: "2024-05-12T21:47:45.867Z",
//     type: "Expense",
//   },
//   {
//     amount: 2000,
//     createdAt: "2024-05-1321:34:45.867Z",
//     type: "Expense",
//   },

//   // ... more data for each day
// ];

// function handleIntervalChange(newInterval) {
//   if (newInterval === "weekly") {
//     setChartData(aggregateWeeklyData(weeklyData));
//   } else if (newInterval === "daily") {
//     setChartData(aggregateDailyData(dailyData));
//   }
// }
// // Function to aggregate data into weekly intervals
// const aggregateWeeklyData = (data) => {

// };

// // Function to aggregate data into daily intervals
// const aggregateDailyData = (data) => {

// };

// // Function to aggregate data into monthly intervals
// function aggregateMonthlyData(data) {

// }

const Overview = ({ time, type }) => {
  //  console.log(time, type)
  const [chartData, setChartData] = useState(data); // Initial data is monthly
  // const { transactionList } = useTransaction();
  // console.log(transactionList)
  const [transactionList, setTransactionList] = useState([]);

  // const [dailyData, setDailyData] = useState([]);
  // const [weeklyData, setWeeklyData] = useState([]);
  // const [monthlyData, setMonthlyData] = useState([]);

  const getAllTransactionList = async () => {
    // console.log('overview fnc calling')
    //Filtering the all exercises according to the searchTerm
    const res = await axios.get(
      "http://localhost:5000/api/v1/transaction/aggtransactions/",
      {
        params: {
          time,
          type,
        },
      }
    );
    console.log("Getting response from server", res);
    // setTransactionList(response?.data?.transactions);
  };

  useEffect(() => {
    getAllTransactionList();
  }, [time, type]);

  // console.log(transactionList);
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
          {value.split(" ")[1]}
        </text>
      </g>
    );
  };

  return (
    <div>
      {/* UI controls to switch between intervals */}
      {/* <button onClick={() => handleIntervalChange("monthly")}>Monthly</button>
      <button onClick={() => handleIntervalChange("weekly")}>Weekly</button>
      <button onClick={() => handleIntervalChange("daily")}>Daily</button> */}

      {/* Chart component */}
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={chartData}>
          <XAxis
            dataKey="name"
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
          {/* <Bar
            dataKey="total"
            fill="currentColor"
            radius={[4, 4, 0, 0]}
            className="fill-primary"
          /> */}
          <Bar dataKey="pv" fill="#8884d8" minPointSize={5}>
            <LabelList dataKey="name" content={renderCustomizedLabel} />
          </Bar>
          <Bar dataKey="uv" fill="#82ca9d" minPointSize={10} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Overview;

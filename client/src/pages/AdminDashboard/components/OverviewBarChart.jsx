import { useTransaction } from "@/provider/transactionProvider";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const monthlyData = [
  {
    name: "Jan",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Feb",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Mar",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Apr",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "May",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Jun",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Jul",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Aug",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Sep",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Oct",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Nov",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Dec",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
];

// const data = [
//   {
//     amount: 800,
//     createdAt: "2024-03-20T21:43:52.867Z",
//     type: "Income",
//   },
//   {
//     amount: 600,
//     createdAt: "2024-03-21T21:43:52.867Z",
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

const Overview = ({ type, time }) => {
  //  console.log(time, type)
  const [chartData, setChartData] = useState(monthlyData); // Initial data is monthly
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
      "http://localhost:5000/api/v1/transaction/aggTransactions/",
      {
        params: {
          time,
          type,
        },
      }
    );
      console.log('Getting response from server', res)
    // setTransactionList(response?.data?.transactions);
  };

  useEffect(() => {
    getAllTransactionList();
  }, [type,time]);

  // console.log(transactionList);

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
          <Bar
            dataKey="total"
            fill="currentColor"
            radius={[4, 4, 0, 0]}
            className="fill-primary"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Overview;

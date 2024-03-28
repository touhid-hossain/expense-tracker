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

// Function to aggregate data into weekly intervals
function aggregateWeeklyData(data) {
  const weeklyData = [];
  let weeklyTotal = 0;
  let currentWeek = 1;
  let weekStartIndex = 0;

  for (let i = 0; i < data.length; i++) {
    const currentDate = new Date(data[i].name);
    const currentMonth = currentDate.getMonth();

    // Check if the date is within the same month
    if (
      i === 0 ||
      currentDate.getMonth() === new Date(data[i - 1].name).getMonth()
    ) {
      // Increment weekly total
      weeklyTotal += data[i].total;
    } else {
      // Push the aggregated data for the current week
      weeklyData.push({
        name: `Week ${currentWeek}`,
        total: weeklyTotal,
      });

      // Reset weekly total for the next week
      weeklyTotal = data[i].total;
      currentWeek++;
    }

    // Check if it's the last data entry
    if (i === data.length - 1) {
      weeklyData.push({
        name: `Week ${currentWeek}`,
        total: weeklyTotal,
      });
    }
  }

  return weeklyData;
}

// Function to aggregate data into daily intervals
function aggregateDailyData(data) {
  const dailyData = [];

  for (let i = 0; i < data.length; i++) {
    const currentMonth = new Date(data[i].name).getMonth();
    const daysInMonth = new Date(
      new Date().getFullYear(),
      currentMonth + 1,
      0
    ).getDate(); // Get the number of days in the month

    // Divide the total by the number of days in the month to get daily average
    const dailyAverage = data[i].total / daysInMonth;

    // Push daily average for each day in the month
    for (let j = 1; j <= daysInMonth; j++) {
      dailyData.push({
        name: `${data[i].name}-${j}`, // Format: "Month-Day"
        total: dailyAverage,
      });
    }
  }

  return dailyData;
}

const Overview = () => {
  const { transactionList } = useTransaction();
  // console.log(transactionList)
  // const [transactionList, setTransactionList] = useState([]);

  // const getAllTransactionList = async () => {
  //   //Filtering the all exercises according to the searchTerm
  //   const response = await axios.get(
  //     "http://localhost:5000/api/v1/transaction"
  //   );
  //   setTransactionList(response?.data?.transactions);
  // };
  
  // useEffect(()=>{
  //   // getAllTransactionList();
  //   },[transactionList])

  console.log(transactionList);

  const [interval, setInterval] = useState("monthly"); // Initial interval is monthly
  const [chartData, setChartData] = useState(monthlyData); // Initial data is monthly

  // Function to handle interval change
  const handleIntervalChange = (newInterval) => {
    setInterval(newInterval);
    // Update chart data based on the new interval
    if (newInterval === "weekly") {
      setChartData(aggregateWeeklyData(monthlyData)); // Assuming you have aggregated weekly data from monthly data
    } else if (newInterval === "daily") {
      setChartData(aggregateDailyData(monthlyData)); // Assuming you have aggregated daily data from monthly data
    } else {
      setChartData(monthlyData); // Default to monthly
    }
  };

  return (
    <div>
      {/* UI controls to switch between intervals */}
      <button onClick={() => handleIntervalChange("monthly")}>Monthly</button>
      <button onClick={() => handleIntervalChange("weekly")}>Weekly</button>
      <button onClick={() => handleIntervalChange("daily")}>Daily</button>

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

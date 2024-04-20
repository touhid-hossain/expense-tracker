import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Overview from "./components/OverviewBarChart";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import RecentTransactions from "./components/RecentTransactions";
import { useEffect } from "react";

const Dashboard = () => {
  const [time, setTime] = useState("month");
  const [yearData, setYearData] = useState([]);
  const [type, setType] = useState("all");

  const getAndSetYearData = async (url) => {
    const { data } = await axios.get(url);
    setYearData(data);
  };
  // component life-cycle hook.
  // when this component load first time, then immediately called this useEffect hook.
  useEffect(() => {
    getAndSetYearData(
      "http://localhost:5000/api/v1/transaction/aggtransactions/?time=weekly"
    );
  }, []);

  return (
    <div className="text-gray-400">
      <div className="flex flex-col xl:flex-row gap-4">
      {/* 1st-part */}
        <div className="flex flex-col xl:w-[60%]">
          {/*Dashboard-Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3  mt-10">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total balance
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$5240.21</div>
                <p className="text-xs text-muted-foreground">
                  +20.1% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total spending
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+250.80</div>
                <p className="text-xs text-muted-foreground">
                  +180.1% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total saved
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <rect width="20" height="14" x="2" y="5" rx="2" />
                  <path d="M2 10h20" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+550.25</div>
                <p className="text-xs text-muted-foreground">
                  +19% from last month
                </p>
              </CardContent>
            </Card>
          </div>
          {/*Overview Bar-Chart */}
          <Card className="mt-5">
            <CardHeader className="flex justify-center md:flex-row md:justify-between items-center">
              <CardTitle className='text-[20px] mb-2 md:mb-0 md:text-2xl'>Spending Summary</CardTitle>
              <div className="flex flex-col-reverse items-center md:items-end gap-4">
                {/* Render barChart depends on selected type */}
                <RadioGroup
                  onValueChange={setType}
                  defaultValue={type}
                  className="flex"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="all"
                      id="r1"
                      checked={type === "all"}
                     
                    />
                    <Label htmlFor="r1">All</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="income"
                      id="r2"
                      checked={type === "income"}
                    />
                    <Label htmlFor="r2">Income</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="expense"
                      id="r3"
                      checked={type === "expense"}
                    />
                    <Label htmlFor="r3">Expense</Label>
                  </div>
                </RadioGroup>
                {/* Render barChart depends on selected time */}
                <Select onValueChange={setTime} defaultValue={time}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Select a time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Select a time</SelectLabel>
                      <SelectItem value="year">This Year</SelectItem>
                      <SelectItem value="month">This Month</SelectItem>
                      <SelectItem value="week">This Week</SelectItem>
                      <SelectItem value="day">Last 24 hours</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent className="pl-2">
              <Overview time={time} type={type} />
            </CardContent>
          </Card>
        </div>
        {/* 2nd-part */}
        {/* Recent Transaction List */}
        <Card className="w-full xl:w-[40%] mt-10">
          <CardHeader className="flex flex-row justify-between items-center">
            <div>
              <CardTitle className="mb-2">Recent Sales</CardTitle>
              <CardDescription>You made 265 sales this month.</CardDescription>
            </div>
            <Link to="/transaction">View All.</Link>
          </CardHeader>
          <CardContent>
            <RecentTransactions />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;

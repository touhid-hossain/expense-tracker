import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import React from "react";
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
import { useTransaction } from "@/provider/transactionProvider";
import TotalOverview from "./components/TotalOverview";

const Dashboard = () => {
  const { handleTimeChange, handleTypeChange, type, time } = useTransaction();

  return (
    <div className="text-gray-400">
      <div className="flex flex-col xl:flex-row gap-4">
        {/* 1st-part */}
        <div className="flex flex-col xl:w-[60%]">
          {/*Dashboard-Cards */}
          <TotalOverview />
          {/*Overview Bar-Chart */}
          <Card className="mt-5">
            <CardHeader className="flex justify-center md:flex-row md:justify-between items-center">
              <CardTitle className="text-[20px] mb-2 md:mb-0 md:text-2xl">
                Spending Summary
              </CardTitle>
              <div className="flex flex-col-reverse items-center md:items-end gap-4">
                {/* Render barChart depends on selected type */}
                <RadioGroup
                  onValueChange={handleTypeChange}
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
                <Select onValueChange={handleTimeChange} value={time}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Select a time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Select a time</SelectLabel>
                      <SelectItem value="yearly">This Year</SelectItem>
                      <SelectItem value="monthly">This Month</SelectItem>
                      {/* <SelectItem value="weekly">This Week</SelectItem>
                      <SelectItem value="daily">Last 24 hours</SelectItem> */}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent className="pl-2">
              <Overview />
            </CardContent>
          </Card>
        </div>
        {/* 2nd-part */}
        {/* Recent Transaction List */}
        <RecentTransactions />
      </div>
    </div>
  );
};

export default Dashboard;

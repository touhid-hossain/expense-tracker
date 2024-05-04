import React from "react";
import TCard from "./TCard";

function TotalOverview() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3  mt-10">
      <TCard title="Total Income" endPoint="total-income" />
      <TCard title="Total Expense" endPoint="total-expense" />
      <TCard title="Total Saved" endPoint="total-saved" />
    </div>
  );
}

export default TotalOverview;

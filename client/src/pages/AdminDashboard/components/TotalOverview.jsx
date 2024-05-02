import React from "react";
import IncomeCard from "./IncomeCard";
import ExpenseCard from "./ExpenseCard";
import SavedCard from "./SavedCard";
function TotalOverview() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3  mt-10">
      <IncomeCard />
      <ExpenseCard />
      <SavedCard />
    </div>
  );
}

export default TotalOverview;

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTransaction } from "@/provider/transactionProvider";
import { useEffect } from "react";
function ExpenseCard() {
  const { fetchExpenseDetails, totalExpenseDetails, totalExpenseLoading } =
    useTransaction();

  useEffect(() => {
    fetchExpenseDetails();
  }, []);

  // utils function
  function makePercentageText(percentageObj) {
    const { isLastNone, increase, value } = percentageObj;
    if (isLastNone) {
      return value;
    }
    if (increase) {
      return `+${value}% from last month`;
    }
    if (!increase && value) {
      return `-${value}% from last month`;
    }
    if (!increase && !value) {
      return `${value}% from last month`;
    }
  }

  if (totalExpenseLoading) return <>Loading...</>;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Expense</CardTitle>
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
        <div className="text-2xl font-bold">${totalExpenseDetails.value}</div>
        <p className="text-xs text-muted-foreground">
          {makePercentageText(totalExpenseDetails.percentage)}
        </p>
      </CardContent>
    </Card>
  );
}

export default ExpenseCard;

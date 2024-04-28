import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTransaction } from "@/provider/transactionProvider";
import { useEffect } from "react";
function TCard({ title, type, details }) {
  const { fetchIncomeDetials, fetchExpenseDetials, fetchSavedDetials } =
    useTransaction();
  const { value = details?.value, percentage } = details;

  function makePercentageText() {
    if (!percentage?.value) {
      return percentage;
    } else {
      return percentage.increse
        ? `+${percentage.value} from last month`
        : `-${percentage.value} from last month`;
    }
  }

  useEffect(() => {
    switch (type) {
      case "income":
        fetchIncomeDetials();
        break;
      case "expense":
        fetchExpenseDetials();
        break;
      case "saved":
        fetchSavedDetials();
        break;
      default:
        // Handle invalid type (optional)
        console.error("Invalid type:", type);
    }
  }, []);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
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
        <div className="text-2xl font-bold">${value}</div>
        <p className="text-xs text-muted-foreground">{makePercentageText()}</p>
      </CardContent>
    </Card>
  );
}

export default TCard;

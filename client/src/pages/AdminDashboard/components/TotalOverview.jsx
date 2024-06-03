import React from "react";
import TCard from "./TCard";
import useSWR from "swr";
import { Skeleton } from "@/components/ui/skeleton";
function TotalOverview() {
  const {
    data: totalDetails,
    error: totalDetailsError,
    isLoading: totalDetailsLoading,
  } = useSWR("/transaction/total-details");
  const {
    data: currentDetials,
    error: currentDetailsError,
    isLoading: currentDetialsLoading,
  } = useSWR("/transaction/current-details");

  if (totalDetailsError || currentDetailsError) return <p>An error occured</p>;

  if (totalDetailsLoading || currentDetialsLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-10">
        <Skeleton className="h-[200px]" />
        <Skeleton className="h-[200px]" />
        <Skeleton className="h-[200px]" />
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3  mt-10">
      <TCard
        title="Total Income"
        details={{
          currentValue: currentDetials?.incomeDetail,
          totalValue: totalDetails?.totalIncome,
        }}
      />
      <TCard
        title="Total Expense"
        details={{
          currentValue: currentDetials?.expenseDetail,
          totalValue: totalDetails?.totalExpense,
        }}
      />
      <TCard
        title="Total Saved"
        details={{
          currentValue: currentDetials?.savedDetail,
          totalValue: totalDetails?.totalSaved,
        }}
      />
    </div>
  );
}

export default TotalOverview;

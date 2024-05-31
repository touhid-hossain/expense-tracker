import React from "react";
import TCard from "./TCard";
import useSWR from "swr";
import { Skeleton } from "@/components/ui/skeleton";
function TotalOverview() {
  const { data, error, isLoading } = useSWR("/transaction/total-details");
  if (error) return <p>An error occured</p>;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3  mt-10">
      {isLoading ? (
        <>
          <Skeleton className="h-28" />
          <Skeleton className="h-28" />
          <Skeleton className="h-28" />
        </>
      ) : (
        <>
          <TCard title="Total Income" details={data?.incomeDetail} />
          <TCard title="Total Expense" details={data?.expenseDetail} />
          <TCard title="Total Saved" details={data?.savedDetail} />
        </>
      )}
    </div>
  );
}

export default TotalOverview;

import moment from "moment";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import React from "react";
import { Button } from "@/components/ui/button";
import EmptyState from "@/components/EmptyState/EmptyState";
import { useUser } from "@/hooks/useUser";
import useSWR from "swr";
import usePagination from "@/hooks/usePagination";
import { Skeleton } from "@/components/ui/skeleton";

const RecentTransactions = () => {
  const { user, isLoading } = useUser();
  const { data: currentTotalTransactions, isLoading: totalTransactionLoading } =
    useSWR("/transaction/currentMonth/transactions");
  const { transactionList, isPaginateLoading } = usePagination({
    isPageOne: true,
    limit: 8,
  });

  let loadingAndEmptyContent;

  if (!transactionList.length) {
    loadingAndEmptyContent = (
      <EmptyState
        title="Gretting!"
        text="You didn't have no transactions record with yet now!"
      />
    );
  }

  if (isPaginateLoading) {
    loadingAndEmptyContent = (
      <div className="flex flex-col gap-5">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
    );
  }

  return (
    <Card className="w-full flex flex-col xl:w-[40%] mt-10">
      <CardHeader className="flex flex-row justify-between items-center">
        <div>
          <CardTitle className="mb-2">Recent Transactions</CardTitle>
          <CardDescription>
            {totalTransactionLoading ? (
              <Skeleton className="w-full h-3" />
            ) : (
              `You made ${currentTotalTransactions} transactions this month.`
            )}
          </CardDescription>
        </div>
        <Button asChild variant="outline">
          <Link to="/transaction"> View All</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {loadingAndEmptyContent}
          {transactionList.map((transaction) => {
            const date = moment(transaction?.createdAt);
            const formattedTransactionDate = date.format("MMM D - h.mm a");
            return (
              <div key={transaction?._id} className="flex items-center">
                <div className="h-9 w-9 rounded-full overflow-hidden">
                  {isLoading ? (
                    <Skeleton className="w-full h-full" />
                  ) : (
                    <img
                      className="h-full w-full object-cover"
                      src={user?.image_url}
                      alt="Avatar"
                    />
                  )}
                </div>
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {transaction?.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {formattedTransactionDate}
                  </p>
                </div>
                <div className="ml-auto font-medium">
                  {transaction?.type === "income" ? "+" : "-"} $
                  {transaction?.amount}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentTransactions;

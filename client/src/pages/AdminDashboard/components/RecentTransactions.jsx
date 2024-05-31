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

const RecentTransactions = () => {
  const { user } = useUser();
  const { data: currentTotalTransactions } = useSWR(
    "/transaction/currentMonth/transactions"
  );
  const { transactionList, isLoading } = usePagination({
    isPageOne: true,
    limit: 8,
  });

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <Card className="w-full flex flex-col xl:w-[40%] mt-10">
      <CardHeader className="flex flex-row justify-between items-center">
        <div>
          <CardTitle className="mb-2">Recent Transactions</CardTitle>
          <CardDescription>
            You made {currentTotalTransactions} transactions this month.
          </CardDescription>
        </div>
        <Button asChild variant="outline">
          <Link to="/transaction"> View All</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {transactionList.length === 0 ? (
            <EmptyState
              title="Gretting!"
              text="You didn't have no transactions record with yet now!"
            />
          ) : (
            transactionList.map((transaction) => {
              const date = moment(transaction?.createdAt);
              const formattedTransactionDate = date.format("MMM D - h.mm a");
              return (
                <div key={transaction?._id} className="flex items-center">
                  <div className="h-9 w-9 rounded-full overflow-hidden">
                    <img
                      className="h-full w-full object-cover"
                      src={`https://expense-tracker-tzs.vercel.app/${user?.image_url}`}
                      alt="Avatar"
                    />
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
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentTransactions;

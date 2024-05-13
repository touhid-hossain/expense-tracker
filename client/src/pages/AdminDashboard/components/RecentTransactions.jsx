import moment from "moment";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import React, { useEffect } from "react";
import { useTransaction } from "@/provider/transactionProvider";
import { Button } from "@/components/ui/button";
import EmptyState from "@/components/EmptyState/EmptyState";
import { useUser } from "@/hooks/useUser";
import useSWRTransaction from "@/hooks/useSWRTransaction";

const RecentTransactions = () => {
  const { user } = useUser();
  const { fetchCurrentMonthTransactions, currentTotalTransactions } =
    useTransaction();

  const { transactionList } = useSWRTransaction();

  const limit = 8;

  useEffect(() => {
    fetchCurrentMonthTransactions();
  }, []);

  return (
    <Card className="w-full flex flex-col xl:w-[40%] mt-10">
      <CardHeader className="flex flex-row justify-between items-center">
        <div>
          <CardTitle className="mb-2">Recent Transactions</CardTitle>
          <CardDescription>
            You made {currentTotalTransactions} transactions this month.
          </CardDescription>
        </div>
        <Button variant="outline">
          <Link to="/transaction"> View All</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {transactionList.length === 0 ? (
            <EmptyState />
          ) : (
            transactionList.slice(0, limit).map((transaction) => {
              const date = moment(transaction?.createdAt);
              const formattedTransactionDate = date.format("MMM D - h.mm a");
              return (
                <div key={transaction?._id} className="flex items-center">
                  <div className="h-9 w-9 rounded-full overflow-hidden">
                    <img
                      className="h-full w-full object-cover"
                      src={`http://localhost:5000/${user?.image_url}`}
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

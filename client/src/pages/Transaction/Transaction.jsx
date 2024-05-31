import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import TransactionPagination from "./components/TransactionPagination";
import TransactionList from "./components/TransactionList";
import { useTransaction } from "@/provider/transactionProvider";
import TransactionFilter from "./components/TransactionFilter";
import usePagination from "@/hooks/usePagination";
import CreateForm from "./components/CreateForm";
import UpdateForm from "./components/UpdateForm";
import ErrorDiaLog from "./components/ErrorDialog";

const Transaction = () => {
  const { toggleTransactionForm } = useTransaction();
  const { isPaginateLoading, totalTransactions, transactionList } =
    usePagination();

  return (
    <Card className="mt-10 h-[85vh] flex flex-col justify-between">
      <div>
        <CardHeader>
          <div className="flex justify-between items-end mb-10">
            <div>
              <CardTitle className="mb-5">Transaction Page</CardTitle>
              <Button variant="outline" onClick={toggleTransactionForm}>
                Add new +
              </Button>
              <div className="mt-2">
                {isPaginateLoading ? (
                  <Skeleton className="h-4 w-[200px]" />
                ) : (
                  <div>
                    <p>
                      {`${totalTransactions} ${
                        totalTransactions > 1 ? "transactions" : "transaction"
                      } found`}
                    </p>
                  </div>
                )}
              </div>
            </div>
            {/* Transaction filter component load here */}
            <TransactionFilter />
          </div>
        </CardHeader>
        <CardContent>
          <TransactionList isNextPage={false} />
          {/*Rendered Next page */}
          <div className="hidden">
            <TransactionList isNextPage={true} />
          </div>
        </CardContent>
      </div>
      {/* Pagination */}
      <TransactionPagination />

      {/* Form */}
      <CreateForm />
      <UpdateForm />
      {/* Error Dialog */}
      <ErrorDiaLog />
    </Card>
  );
};

export default Transaction;

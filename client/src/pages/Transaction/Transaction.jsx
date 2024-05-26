import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";
import TransactionPagination from "./components/TransactionPagination";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import { useTransaction } from "@/provider/transactionProvider";
import TransactionFilter from "./components/TransactionFilter";
import usePagination from "@/hooks/usePagination";

const Transaction = () => {
  const [transactionFormOpen, setTransactionFormOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const { currentPage, debouncedSearch, filterType } = useTransaction();

  const { totalPages, pagesToShow, totalTransactions, isLoading } =
    usePagination({
      currentPage,
      filterOptions: { type: filterType, search: debouncedSearch },
    });

  //  open/close transaction form
  const toggleTransactionForm = () =>
    setTransactionFormOpen((prevState) => !prevState);
  const toggleEditForm = () => setIsEditMode((prevState) => !prevState);

  // selected transaction handler
  const handleSelectUpdateTransaction = (t, isOpenDialog = true) => {
    setSelectedTransaction(t);
    isOpenDialog && toggleEditForm();
  };

  return (
    <Card className="mt-10 h-[85vh] flex flex-col justify-between">
      <div>
        <CardHeader>
          <div className="flex justify-between items-end mb-10">
            <div>
              <CardTitle className="mb-5">Transaction Page</CardTitle>
              <Button
                variant="outline"
                onClick={() => setTransactionFormOpen(true)}
              >
                Add new +
              </Button>
              <div className="mt-2">
                {isLoading ? (
                  <Skeleton className="h-4 w-[200px]" />
                ) : (
                  // <p>Loading...</p>
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
            <TransactionFilter totalTransactions={totalTransactions} />
          </div>
        </CardHeader>
        <CardContent>
          <Dialog open={isEditMode || transactionFormOpen}>
            <DialogContent>
              <div
                onClick={isEditMode ? toggleEditForm : toggleTransactionForm}
                className="cursor-pointer relative rounded-sm opacity-60 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none  focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
              >
                <X className="absolute right-[-15px] top-[-15px] h-5 w-5 rounded-md bg-rose-600 p-[2px] text-white " />
              </div>
              <TransactionForm
                isEditMode={isEditMode}
                toggleTransactionForm={toggleTransactionForm}
                toggleEditForm={toggleEditForm}
                selectedTransaction={selectedTransaction}
                handleSelectUpdateTransaction={handleSelectUpdateTransaction}
              />
            </DialogContent>
          </Dialog>
          <TransactionList
            handleSelectUpdateTransaction={handleSelectUpdateTransaction}
            selectedTransaction={selectedTransaction}
            currentPage={currentPage}
          />
          {/*Rendered Next page */}
          <div className="hidden">
            <TransactionList
              handleSelectUpdateTransaction={handleSelectUpdateTransaction}
              selectedTransaction={selectedTransaction}
              currentPage={totalPages !== currentPage ? currentPage + 1 : 1}
            />
          </div>
        </CardContent>
      </div>
      {/* Pagination */}
      <TransactionPagination
        pagesToShow={pagesToShow}
        totalPages={totalPages}
      />
    </Card>
  );
};

export default Transaction;

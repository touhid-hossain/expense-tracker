import React, { useState } from "react";
import EmptyState from "@/components/EmptyState/EmptyState";
import useSWRTransaction from "@/hooks/useSWRTransaction";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useTransaction } from "@/provider/transactionProvider";
import usePagination from "@/hooks/usePagination";
import { Skeleton } from "@/components/ui/skeleton";
import TransactionCard from "./TransactionCard";

const TransactionList = ({ isNextPage }) => {
  const [confirmDeleteTransaction, setConfirmDeleteTransaction] =
    useState(false);
  const { filterType, debouncedSearch } = useTransaction();

  const { transactionList, isPaginateLoading } = usePagination({
    isNextPage,
  });

  // toggle delete dialog
  const handleOpenDeleteDialog = () => setConfirmDeleteTransaction(true);
  const handleCloseDeleteDialog = () => setConfirmDeleteTransaction(false);

  let errorContent;

  if (!transactionList.length) {
    errorContent = (
      <EmptyState
        title="No transactions found"
        text={`Can't find transaction with type: ${filterType} and search: ${debouncedSearch}`}
        showBtn={false}
      />
    );
  }

  if (isPaginateLoading) {
    return <Skeleton className="h-8 w-full" />;
  }

  return (
    <div className="space-y-8">
      {errorContent}
      {transactionList.map((transaction) => (
        <TransactionCard
          key={transaction._id}
          transaction={transaction}
          handleOpenDeleteDialog={handleOpenDeleteDialog}
        />
      ))}

      {/* Confirm delete transaction component */}
      <DeleteTransactionForm
        confirmDelete={confirmDeleteTransaction}
        handleCloseDeleteDialog={handleCloseDeleteDialog}
      />
    </div>
  );
};

// Delete transaction Dialog
const DeleteTransactionForm = ({ confirmDelete, handleCloseDeleteDialog }) => {
  const { deleteTransaction } = useSWRTransaction();
  const {
    currentPage,
    paginate,
    handleSelectUpdateTransaction,
    selectedTransaction,
  } = useTransaction();
  const { transactionList } = usePagination();

  return (
    <Dialog open={confirmDelete} className="bg-black/20">
      <DialogContent className="sm:max-w-[370px]">
        <div
          onClick={handleCloseDeleteDialog}
          className="cursor-pointer relative rounded-sm opacity-60 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none  focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
        >
          <X className="absolute right-[-15px] top-[-15px] h-5 w-5 rounded-md bg-rose-600 p-[2px] text-white " />
        </div>
        <DialogHeader>
          <DialogTitle className="text-center text-xl">
            Do you want to delete this transaction?
          </DialogTitle>
        </DialogHeader>
        <div className="flex justify-between items-center m-auto w-[170px] mt-2 ">
          <Button
            type="button"
            variant="destructive"
            onClick={() => {
              deleteTransaction(selectedTransaction._id);
              if (transactionList.length === 1 && currentPage > 1) {
                paginate(currentPage - 1);
              }
              handleCloseDeleteDialog();
              handleSelectUpdateTransaction(null, false);
            }}
          >
            Delete
          </Button>
          <Button type="button" onClick={handleCloseDeleteDialog}>
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TransactionList;

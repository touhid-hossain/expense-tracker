import React, { useState } from "react";
import moment from "moment";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiEditAlt } from "react-icons/bi";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import EmptyState from "@/components/EmptyState/EmptyState";
import { useUser } from "@/hooks/useUser";
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

const TransactionList = ({
  handleSelectUpdateTransaction,
  selectedTransaction: selectedId,
  search,
  currentPage,
}) => {
  const { user } = useUser();
  const [confirmDeleteTransaction, setConfirmDeleteTransaction] =
    useState(false);
  const { filterType, debouncedSearch } = useTransaction();

  const { transactionList, isLoading, totalTransactions } = usePagination({
    currentPage,
    filterOptions: { type: filterType, search: debouncedSearch },
  });

  // toggle delete dialog
  const handleOpenDeleteDialog = () => setConfirmDeleteTransaction(true);
  const handleCloseDeleteDialog = () => setConfirmDeleteTransaction(false);

  if (isLoading) return <h1>Loading...</h1>;

  let errorContent;
  if (!totalTransactions || !transactionList.length) {
    errorContent = (
      <EmptyState
        title="No transactions found"
        text={`Can't find transaction with type: ${filterType} and search: ${debouncedSearch}`}
        showBtn={false}
      />
    );
  }

  return (
    <div className="space-y-8">
      {errorContent}
      {transactionList?.map((transaction) => {
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
            <div className="flex gap-2 pl-10">
              {/* on-hover edit tooltip */}
              <TooltipProvider delayDuration={150}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <BiEditAlt
                        onClick={() =>
                          handleSelectUpdateTransaction(transaction)
                        }
                        className="text-sky-600 cursor-pointer"
                      />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Edit</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              {/* on-hover delete tooltip */}
              <TooltipProvider delayDuration={150}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <RiDeleteBin6Line
                        onClick={() => {
                          handleOpenDeleteDialog();
                          handleSelectUpdateTransaction(transaction._id, false);
                        }}
                        className="text-red-500 cursor-pointer"
                      />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Delete</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        );
      })}
      {
        ///* Confirm delete transaction component */
        <DeleteTransactionForm
          confirmDelete={confirmDeleteTransaction}
          handleCloseDeleteDialog={handleCloseDeleteDialog}
          handleSelectUpdateTransaction={handleSelectUpdateTransaction}
          selectedId={selectedId}
          transactionList={transactionList}
        />
      }
    </div>
  );
};

// Delete transaction Dialog
const DeleteTransactionForm = ({
  confirmDelete,
  handleCloseDeleteDialog,
  handleSelectUpdateTransaction,
  selectedId,
  transactionList,
}) => {
  const { deleteTransaction } = useSWRTransaction();
  const { currentPage, paginate } = useTransaction();

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
              deleteTransaction(selectedId);
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

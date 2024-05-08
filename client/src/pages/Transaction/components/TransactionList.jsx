import React, { useState } from "react";
import moment from "moment";
import { useAuth } from "@/provider/authProvider";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiEditAlt } from "react-icons/bi";
import { useTransaction } from "@/provider/transactionProvider";
import DeleteTransactionForm from "./DeleteTransactionForm";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const TransactionList = ({ handleSelectUpdateTransaction }) => {
  const { user } = useAuth();
  const [confirmDeleteTransaction, setConfirmDeleteTransaction] =
    useState(false);
  const [selectedId, setSelectedId] = useState("");
  const { transactionList } = useTransaction();

  return (
    <div className="space-y-8">
      {transactionList.length === 0 && (
        <div className="flex items-center justify-center h-[50vh]">
          <h6>No Transactions found</h6>
        </div>
      )}
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
              <TooltipProvider>
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
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <RiDeleteBin6Line
                        onClick={() => {
                          setConfirmDeleteTransaction(true),
                            setSelectedId(transaction._id);
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
          setConfirm={setConfirmDeleteTransaction}
          selectedId={selectedId}
        />
      }
    </div>
  );
};

export default TransactionList;

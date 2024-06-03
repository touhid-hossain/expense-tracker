import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiEditAlt } from "react-icons/bi";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import dayjs from "dayjs";
import { useUser } from "@/hooks/useUser";
import { useTransaction } from "@/provider/transactionProvider";
import { Skeleton } from "@/components/ui/skeleton";

function TransactionCard({ transaction, handleOpenDeleteDialog }) {
  const { user, isLoading } = useUser();
  const { handleSelectUpdateTransaction } = useTransaction();

  const formattedTransactionDate = dayjs(transaction.createdAt).format(
    "MMM D - h.mm a"
  );

  return (
    <div className="flex items-center">
      <div className="h-9 w-9 rounded-full overflow-hidden">
        {isLoading ? (
          <Skeleton className="w-full h-full" />
        ) : (
          <img
            className="h-full w-full object-cover"
            src={user.image_url}
            alt="Avatar"
          />
        )}
      </div>
      <div className="ml-4 space-y-1">
        <p className="text-sm font-medium leading-none">{transaction?.name}</p>
        <p className="text-sm text-muted-foreground">
          {formattedTransactionDate}
        </p>
      </div>
      <div className="ml-auto font-medium">
        {transaction?.type === "income" ? "+" : "-"} ${transaction?.amount}
      </div>
      <div className="flex gap-2 pl-10">
        {/* on-hover edit tooltip */}
        <TooltipProvider delayDuration={150}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <BiEditAlt
                  onClick={() => handleSelectUpdateTransaction(transaction)}
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
                    handleSelectUpdateTransaction(transaction, false);
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
}

export default TransactionCard;

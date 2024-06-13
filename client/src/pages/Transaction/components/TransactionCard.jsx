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
    <div className="flex justify-between items-center mt-5">
      <div className="flex gap-4 flex-1">
        <div className="hidden sm:block h-9 w-9 rounded-full overflow-hidden">
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
        <div className="ml-0 space-y-1">
          <p className="text-sm font-medium leading-none">
            {transaction?.name}
          </p>
          <p className="text-sm text-muted-foreground">
            {formattedTransactionDate}
          </p>
        </div>
      </div>

      <div className="flex gap-5">
        <div className="ml-auto font-medium">
          {transaction?.type === "income" ? "+" : "-"} ${transaction?.amount}
        </div>
        <div className="flex gap-2 ">
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
    </div>
  );
}

export default TransactionCard;

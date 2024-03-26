import React from "react";
import { useUser } from "@/provider/userProvider";

const TransactionList = ({ transactionList }) => {
  const { user } = useUser();
  return (
    <div className="space-y-8">
      {
        transactionList.length === 0 && (
          <div className="flex items-center justify-center  h-[50vh]">
            <h6>No Transactions found</h6>
          </div>
        )
      }
      {transactionList?.map((transaction) => {
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
                {transaction?.createdAt}
              </p>
            </div>
            <div className="ml-auto font-medium">
              {transaction?.type === "income" ? "+" : "-"} {transaction?.amount}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TransactionList;

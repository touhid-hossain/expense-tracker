import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@/provider/userProvider";
import axios from "axios";
import moment from "moment";

import React, { useEffect, useState } from "react";

const RecentTransactions = () => {
  const [transactionList, setTransactionList] = useState([]);
  const { user } = useUser();

  const limit = 5;
  const recentTransactions = async () => {
    //Filtering the all exercises according to the searchTerm
    const response = await axios.get(
      "http://localhost:5000/api/v1/transaction",
      {
        params: {
          limit,
        },
      }
    );
    setTransactionList(response?.data?.transactions);
  };

  useEffect(() => {
    recentTransactions();
  }, []);

  // console.log("checking recent transactions", transactionList);

  return (
    <div className="space-y-8">
      {transactionList.length === 0 && (
        <div className="flex items-center justify-center  h-[50vh]">
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
          </div>
        );
      })}
    </div>
  );
};

export default RecentTransactions;

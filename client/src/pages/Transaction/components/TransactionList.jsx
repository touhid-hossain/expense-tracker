import React from "react";
import { useUser } from "@/provider/userProvider";
import moment from "moment";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiEditAlt } from "react-icons/bi";
import { useTransaction } from "@/provider/transactionProvider";

const TransactionList = ({setOpen}) => {
  const { user } = useUser();
  const { transactionList, editForm, deleteTransaction } = useTransaction();

  // edit-transaction function
  const editFormFunction = (values) => {
    setOpen(true)
    console.log("sending edit data to context");
    editForm(values._id, values);
  };

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
              <BiEditAlt
                onClick={() => editFormFunction(transaction)}
                className="text-sky-600 cursor-pointer"
              />
              <RiDeleteBin6Line
                onClick={() => deleteTransaction(transaction._id)}
                className="text-red-500 cursor-pointer"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TransactionList;

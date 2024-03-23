import React, { useEffect } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import axios from "axios";
import { getInitials } from "@/lib/utils";
import { useUser } from "@/provider/userProvider";
import { useTransaction } from "@/provider/transactionProvider";
import { useAuth } from "@/provider/authProvider";

const TransactionList = () => {
  const { transactionList, setTransactionList } = useTransaction();
  const { user } = useUser();

  const getTransactionsList = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/transaction"
      );
      setTransactionList(response?.data?.transactions);
    } catch (error) {
      console.log(error)
    }
  }

  // Fetch transactionList after creating a new transaction
  useEffect(() => {
    getTransactionsList();
  }, []);

  return (
    <div className="space-y-8">
      {transactionList?.map((transaction) => {
        return (
          <div key={transaction._id} className="flex items-center">
            <Avatar className="h-9 w-9">
              <AvatarImage src={`http://localhost:5000/${user?.image_url}`} alt="Avatar" />
              <AvatarFallback>{getInitials(user?.name)} </AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">
                {transaction.name}
              </p>
              <p className="text-sm text-muted-foreground">
                {transaction.createdAt}
              </p>
            </div>
            <div className="ml-auto font-medium">
              {transaction.type === "income" ? "+" : "-"} {transaction.amount}
            </div>
          </div>
        );
      })}

      {/* Pagination */}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default TransactionList;

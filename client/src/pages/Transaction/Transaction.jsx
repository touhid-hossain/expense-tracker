import React, { useState, useEffect } from "react";
import TransactionList from "./components/TransactionList";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import TransactionForm from "./components/TransactionForm";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useTransaction } from "@/provider/transactionProvider";
import axios from "axios";
import {
  Pagination,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
  PaginationContent,
} from "@/components/ui/pagination";

// const transactionList = [
//   {
//     _id: 1,
//     name: "buy a car",
//     type: "income",
//     category: "car",
//     amount: "2545$",
//     createdAt: "Oct-7, Monday",
//   },
//   {
//     _id: 2,
//     name: "buy a car",
//     type: "income",
//     category: "car",
//     amount: "2545$",
//     createdAt: "Oct-7, Monday",
//   },
//   {
//     _id: 3,
//     name: "buy a car",
//     type: "income",
//     category: "car",
//     amount: "2545$",
//     createdAt: "Oct-7, Monday",
//   },
//   {
//     _id: 4,
//     name: "buy a car",
//     type: "income",
//     category: "car",
//     amount: "2545$",
//     createdAt: "Oct-7, Monday",
//   },
//   {
//     _id: 5,
//     name: "buy a car",
//     type: "income",
//     category: "car",
//     amount: "2545$",
//     createdAt: "Oct-7, Monday",
//   },
//   {
//     _id: 6,
//     name: "buy a car",
//     type: "income",
//     category: "car",
//     amount: "2545$",
//     createdAt: "Oct-7, Monday",
//   },
//   {
//     _id: 7,
//     name: "buy a car",
//     type: "income",
//     category: "car",
//     amount: "2545$",
//     createdAt: "Oct-7, Monday",
//   },
//   {
//     _id: 8,
//     name: "buy a car",
//     type: "income",
//     category: "car",
//     amount: "2545$",
//     createdAt: "Oct-7, Monday",
//   },
//   {
//     _id: 9,
//     name: "buy a car",
//     type: "income",
//     category: "car",
//     amount: "2545$",
//     createdAt: "Oct-7, Monday",
//   },
//   {
//     _id: 10,
//     name: "buy a car",
//     type: "income",
//     category: "car",
//     amount: "2545$",
//     createdAt: "Oct-7, Monday",
//   },
//   {
//     _id: 11,
//     name: "buy a car",
//     type: "income",
//     category: "car",
//     amount: "2545$",
//     createdAt: "Oct-7, Monday",
//   },
//   {
//     _id: 12,
//     name: "buy a car",
//     type: "income",
//     category: "car",
//     amount: "2545$",
//     createdAt: "Oct-7, Monday",
//   },
// ];

const Transaction = () => {
  const [transactionFormOpen, setTransactionFormOpen] = useState(false);
  const { transactionList, setTransactionList } = useTransaction();

  const [currentPage, setCurrentPage] = useState(1);

  const transactionsPerPage = 2;
  const pagesToShow = 5;

  const getTransactionsList = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/transaction"
      );
      setTransactionList(response?.data?.transactions);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTransactionsList();
  }, []);

  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = transactionList.slice(
    indexOfFirstTransaction, // 1st page - 0, 2nd page -  5, 3rd page- 10
    indexOfLastTransaction // 1st page- 5, 2nd page- 10, 3rd page- 15
  );
  // console.log("slice by 1st and last index", currentTransactions);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(transactionList.length / transactionsPerPage);

  const shouldShowStartEllipsis = currentPage > pagesToShow;
  const shouldShowEndEllipsis = currentPage < totalPages - pagesToShow + 1;

  console.log(
    "start ellips",
    shouldShowStartEllipsis,
    "end ellips",
    shouldShowEndEllipsis
  );

  return (
    <Card className="mt-10 h-[85vh] flex flex-col justify-between">
      <CardHeader>
        <div className="flex justify-between items-end">
          <div>
            <CardTitle className="mb-5">Transaction Page</CardTitle>
            <Button
              variant="outline"
              onClick={() => setTransactionFormOpen(true)}
            >
              Add new +
            </Button>
          </div>
          <div className="w-[300px] relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search" className="pl-8" />
            {/* Filter Transaction List */}
            <div className="flex justify-end gap-3 mt-3">
              <Label>Sort By :</Label>
              <RadioGroup defaultValue="Income" className="flex">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Income" id="r2" />
                  <Label htmlFor="r2">Income</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Expense" id="r3" />
                  <Label htmlFor="r3">Expense</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Dialog open={transactionFormOpen}>
          <DialogContent>
            <div
              onClick={() => setTransactionFormOpen(false)}
              className="cursor-pointer relative rounded-sm opacity-60 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none  focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
            >
              <X className="absolute right-[-15px] top-[-15px] h-5 w-5 rounded-md bg-rose-600 p-[2px] text-white " />
            </div>
            <TransactionForm
              open={transactionFormOpen}
              setOpen={setTransactionFormOpen}
            />
          </DialogContent>
        </Dialog>
        <TransactionList transactionList={currentTransactions} />
      </CardContent>
      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        pagesToShow={pagesToShow}
        onPageChange={paginate}
        className="mb-3 cursor-pointer"
      >
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              disabled={currentPage === 1}
              onClick={() => paginate(currentPage - 1)}
              className={
                currentPage === 1 ? "pointer-events-none opacity-50" : undefined
              }
            />
          </PaginationItem>

          {shouldShowStartEllipsis && <PaginationEllipsis />}

          {[...Array(totalPages)].map((_, index) => {
            if (
              index + 1 === 1 ||
              index + 1 === totalPages ||
              (index + 1 >= currentPage - Math.floor(pagesToShow / 2) &&
                index + 1 <= currentPage + Math.floor(pagesToShow / 2))
            ) {
              return (
                <PaginationItem key={index}>
                  <PaginationLink
                    onClick={() => paginate(index + 1)}
                    isActive={index + 1 === currentPage}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              );
            }
            return null;
          })}

          {shouldShowEndEllipsis && <PaginationEllipsis />}

          <PaginationItem>
            <PaginationNext
              disabled={currentPage === totalPages}
              onClick={() => paginate(currentPage + 1)}
              className={
                currentPage === totalPages
                  ? "pointer-events-none opacity-50"
                  : undefined
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </Card>
  );
};

export default Transaction;

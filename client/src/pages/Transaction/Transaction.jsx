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
import { useDebounce } from "@/lib/utils";

const Transaction = () => {
  const [transactionFormOpen, setTransactionFormOpen] = useState(false);
  const { transactionList, setTransactionList } = useTransaction([]);
  const [type, setType] = useState("");

  const [totalTransactions, setTotalTransactions] = useState(0);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const debouncedValue = useDebounce(search, 300);

  const limit = 5;

  const totalPages = Math.ceil(totalTransactions / limit);
  const pagesToShow = totalPages > 5 ? 5 : totalPages;
  // console.log("totalPages", totalPages);
  // console.log("how many page numbers i wanna show", pagesToShow);
  // console.log("current page no", currentPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  // Searching with the debounced value
  const debouncedSearch = async () => {
    //Filtering the all exercises according to the searchTerm
    const response = await axios.get(
      "http://localhost:5000/api/v1/transaction",
      {
        params: {
          search,
          type,
          page: currentPage,
          limit,
        },
      }
    );

    setTransactionList(response?.data?.transactions);
    setTotalTransactions(response?.data?.totalTransactions);
  };

  // HANDLING WHEN SEARCH TERM  CHANGES
  useEffect(() => {
    const handleSearch = debouncedSearch;
    handleSearch();
    return () => clearTimeout(debouncedSearch);
  }, [debouncedValue, currentPage]);

  return (
    <Card className="mt-10 h-[85vh] flex flex-col justify-between">
      <div>
        <CardHeader>
          <div className="flex justify-between items-end mb-10">
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
              <Input
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search"
                className="pl-8"
              />
              {/* Filter Transaction List */}
              <div className="flex justify-end gap-3 mt-3">
                <Label>Sort By :</Label>
                <RadioGroup
                  onValueChange={(e) => setType(e.target.value)}
                  defaultValue={type}
                  className="flex"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="fd" id="r1" />
                    <Label htmlFor="r1">All</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="income" id="r2" />
                    <Label htmlFor="r2">Income</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="expense" id="r3" />
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
          <TransactionList transactionList={transactionList} />
        </CardContent>
      </div>
      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        pagesToShow={pagesToShow}
        className="mb-3 cursor-pointer"
      >
        {/* MY CODES */}
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

          {/* Render pagination links */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
            if (
              page === 1 ||
              page === totalPages ||
              (page >= currentPage - Math.floor(pagesToShow / 2) &&
                page <= currentPage + Math.floor(pagesToShow / 2))
            ) {
              return (
                <PaginationItem key={page} active={page === currentPage}>
                  <PaginationLink onClick={() => paginate(page)}>
                    {page}
                  </PaginationLink>
                </PaginationItem>
              );
            }

            if ((page === 2 && currentPage > 1) || page === totalPages - 1) {
              return <PaginationEllipsis key={`ellipsis-${page}`} />;
            }

            return null;
          })}

          <PaginationItem>
            <PaginationNext
              disabled={totalPages <= currentPage}
              onClick={() => paginate(currentPage + 1)}
              className={
                totalPages <= currentPage
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

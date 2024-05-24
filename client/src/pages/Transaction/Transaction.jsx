import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";
import TransactionPagination from "./components/TransactionPagination";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import { useTransaction } from "@/provider/transactionProvider";
import TransactionFilter from "./components/TransactionFilter";
import useDebounce from "@/hooks/useDebounce";
import usePagination from "@/hooks/usePagination";
export const PAGINATE_LIMIT = 3;

const Transaction = () => {
  const [type, setType] = useState("all");
  const [search, setSearch] = useState("");
  const [transactionFormOpen, setTransactionFormOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const { currentPage, paginate } = useTransaction();

  const debouncedSearch = useDebounce(search, 500, () => {
    paginate(1);
  });

  const { totalPages, pagesToShow } = usePagination({
    currentPage,
    limit: PAGINATE_LIMIT,
    filterOptions: { type, search },
  });

  //  open/close transaction form
  const toggleTransactionForm = () =>
    setTransactionFormOpen((prevState) => !prevState);
  const toggleEditForm = () => setIsEditMode((prevState) => !prevState);

  // selected transaction handler
  const handleSelectUpdateTransaction = (t, isOpenDialog = true) => {
    setSelectedTransaction(t);
    isOpenDialog && toggleEditForm();
  };

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
            {/* Transaction filter component load here */}
            <TransactionFilter
              type={type}
              search={search}
              setType={setType}
              setSearch={setSearch}
            />
          </div>
        </CardHeader>
        <CardContent>
          <Dialog open={isEditMode || transactionFormOpen}>
            <DialogContent>
              <div
                onClick={isEditMode ? toggleEditForm : toggleTransactionForm}
                className="cursor-pointer relative rounded-sm opacity-60 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none  focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
              >
                <X className="absolute right-[-15px] top-[-15px] h-5 w-5 rounded-md bg-rose-600 p-[2px] text-white " />
              </div>
              <TransactionForm
                isEditMode={isEditMode}
                toggleTransactionForm={toggleTransactionForm}
                toggleEditForm={toggleEditForm}
                selectedTransaction={selectedTransaction}
                handleSelectUpdateTransaction={handleSelectUpdateTransaction}
              />
            </DialogContent>
          </Dialog>
          <TransactionList
            handleSelectUpdateTransaction={handleSelectUpdateTransaction}
            selectedTransaction={selectedTransaction}
            limit={PAGINATE_LIMIT}
            type={type}
            search={debouncedSearch}
            currentPage={currentPage}
          />
          {/*Rendered Next page */}
          <div className="hidden">
            <TransactionList
              handleSelectUpdateTransaction={handleSelectUpdateTransaction}
              selectedTransaction={selectedTransaction}
              currentPage={totalPages !== currentPage ? currentPage + 1 : 1}
              limit={PAGINATE_LIMIT}
              type={type}
              search={debouncedSearch}
            />
          </div>
        </CardContent>
      </div>
      {/* Pagination */}
      <TransactionPagination
        pagesToShow={pagesToShow}
        totalPages={totalPages}
        paginate={paginate}
        currentPage={currentPage}
      />
    </Card>
  );
};

export default Transaction;

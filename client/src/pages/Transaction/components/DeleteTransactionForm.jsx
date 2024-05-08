import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import React from "react";
import axios from "@/lib/axios";
import { useTransaction } from "@/provider/transactionProvider";
import { toast } from "@/components/ui/use-toast";

const DeleteTransactionForm = ({ confirmDelete, setConfirm, selectedId }) => {
  const { transactionList, setTransactionList } = useTransaction();
  // Delete transaction-list
  const deleteTransaction = async (id) => {
    try {
      const { status } = await axios.delete(
        `/transaction/delete-transaction/${id}`
      );
      if (status === 200) {
        toast({
          title: "Transaction Deleted Successfully",
          variant: "success",
        });
      }
      setTransactionList(transactionList.filter((t) => t._id !== id));
    } catch (error) {
      toast({
        title: error.message,
        variant: "destructive",
      });
      console.error(error);
    }
  };

  return (
    <>
      {confirmDelete && (
        <Dialog open={confirmDelete} className="bg-black/20">
          <DialogContent className="sm:max-w-[370px]">
            <div
              onClick={() => setConfirm(false)}
              className="cursor-pointer relative rounded-sm opacity-60 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none  focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
            >
              <X className="absolute right-[-15px] top-[-15px] h-5 w-5 rounded-md bg-rose-600 p-[2px] text-white " />
            </div>
            <DialogHeader>
              <DialogTitle className="text-center text-xl">
                Do you want to delete this transaction?
              </DialogTitle>
            </DialogHeader>
            <div className="flex justify-between items-center m-auto w-[170px] mt-2 ">
              <Button
                type="button"
                variant="destructive"
                onClick={() => {
                  deleteTransaction(selectedId);
                  setConfirm(false);
                }}
              >
                Delete
              </Button>
              <Button
                type="button"
                onClick={() => {
                  setConfirm(false);
                }}
              >
                Cancel
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default DeleteTransactionForm;

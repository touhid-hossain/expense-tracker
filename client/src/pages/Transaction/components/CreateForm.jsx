import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";
import TransactionForm from "./TransactionForm";
import { useTransaction } from "@/provider/transactionProvider";
import useSWRTransaction from "@/hooks/useSWRTransaction";

const CreateForm = () => {
  const { transactionFormOpen, toggleTransactionForm } = useTransaction();
  const { createTransactionHandler, isCreating } = useSWRTransaction();

  return (
    <Dialog open={transactionFormOpen}>
      <DialogContent>
        <div
          onClick={toggleTransactionForm}
          className="cursor-pointer relative rounded-sm opacity-60 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none  focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
        >
          <X className="absolute right-[-15px] top-[-15px] h-5 w-5 rounded-md bg-rose-600 p-[2px] text-white" />
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="mb-2 text-center">
              Create Transaction
            </CardTitle>
          </CardHeader>
          <CardContent>
            <TransactionForm
              buttonText={isCreating ? "Creating..." : "Submit"}
              handler={createTransactionHandler}
            />
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default CreateForm;

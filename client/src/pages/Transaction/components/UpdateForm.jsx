import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";
import TransactionForm from "./TransactionForm";
import { useTransaction } from "@/provider/transactionProvider";
import usePagination from "@/hooks/usePagination";

const UpdateForm = () => {
  const { isEditMode, toggleEditForm } = useTransaction();
  const { isPaginateValidating } = usePagination();

  return (
    <Dialog open={isEditMode}>
      <DialogContent>
        <div
          onClick={toggleEditForm}
          className="cursor-pointer relative rounded-sm opacity-60 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none  focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
        >
          <X className="absolute right-[-15px] top-[-15px] h-5 w-5 rounded-md bg-rose-600 p-[2px] text-white " />
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="mb-2 text-center">
              Update Transaction
            </CardTitle>
          </CardHeader>
          <CardContent>
            <TransactionForm
              buttonText={isPaginateValidating ? "Updating..." : "Update"}
              isEditMode={true}
            />
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateForm;

import React from "react";
import TransactionList from "./components/TransactionList";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import TransactionForm from "./components/TransactionForm";

const Transaction = () => {
  return (
    <Card className="mt-10">
      <Dialog>
        <CardHeader>
          <div className="mb-10">
            <CardTitle className="mb-5">Transaction Page</CardTitle>
            <DialogTrigger asChild>
              <Button variant="outline">Add new +</Button>
            </DialogTrigger>
          </div>
        </CardHeader>
        <CardContent>
          <DialogContent>
            <TransactionForm />
          </DialogContent>
          <TransactionList />
        </CardContent>
      </Dialog>
    </Card>
  );
};

export default Transaction;

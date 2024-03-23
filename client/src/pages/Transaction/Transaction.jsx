import React, { useState } from "react";
import TransactionList from "./components/TransactionList";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import TransactionForm from "./components/TransactionForm";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const Transaction = () => {
  // const [transactionList, setTransactionList] = useState([]);
  const [transactionFormOpen, setTransactionFormOpen] = useState(false);
  return (
    <Card className="mt-10">
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
        <TransactionList />
      </CardContent>
    </Card>
  );
};

export default Transaction;

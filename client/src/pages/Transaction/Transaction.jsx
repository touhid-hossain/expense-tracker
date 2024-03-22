import React, { useState } from "react";
import TransactionList from "./components/TransactionList";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import TransactionForm from "./components/TransactionForm";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const Transaction = () => {
  const [transactionList, setTransactionList]  = useState([])
  return (
    <Card className="mt-10">
      <Dialog>
        <CardHeader>
          <div className="flex justify-between items-end mb-10">
            <div>
              <CardTitle className="mb-5">Transaction Page</CardTitle>
              <DialogTrigger asChild>
                <Button variant="outline">Add new +</Button>
              </DialogTrigger>
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

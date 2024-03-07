import React from "react";
import TransactionList from "./components/TransactionList";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import TransactionForm from "./components/TransactionForm";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const Transaction = () => {
  return (
    <Card className="mt-10">
      <Dialog>
        <CardHeader>
          <div className="flex justify-between items-end mb-10">
            <div>
              <CardTitle className="mb-5">
                Transaction Page ADD SEARCH BAR
              </CardTitle>
              <DialogTrigger asChild>
                <Button variant="outline">Add new +</Button>
              </DialogTrigger>
            </div>
            <div className="w-[300px] relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search" className="pl-8" />
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

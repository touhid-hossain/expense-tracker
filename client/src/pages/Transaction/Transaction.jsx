import React from "react";
import TransactionList from "./components/TransactionList";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const Transaction = () => {
  return (
    <Card className="mt-10">
      <CardHeader className="">
        <div>
          <CardTitle className="mb-2">Transactions</CardTitle>
          <Link to="">+ Add New</Link>
        </div>
      </CardHeader>
      <CardContent>
        <TransactionList />
      </CardContent>
    </Card>
  );
};

export default Transaction;

import React, { useState } from "react";
import TransactionList from "./components/TransactionList";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import TransactionForm from "./components/TransactionForm";

const Transaction = () => {
  const [showForm, setShowForm] = useState(true);
  return (
    <Card className="mt-10">
      <CardHeader>
        <div className="mb-10">
          <CardTitle className="mb-5">Transaction Page</CardTitle>
          <Button onClick={() => setShowForm(!showForm)}>+ Add New</Button>
        </div>
        {showForm ? <TransactionForm /> : null}
      </CardHeader>
      <CardContent>
        <TransactionList />
      </CardContent>
    </Card>
  );
};

export default Transaction;

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

function EmptyState({ showBtn = true, text }) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center py-[150px]">
      <Card>
        <CardHeader>
          <CardTitle>Greeting!</CardTitle>
          {/* <CardDescription>You didn't have no transactions record yet now.</CardDescription> */}
          <CardDescription>{text}</CardDescription>
        </CardHeader>
        {showBtn && (
          <CardContent>
            <Button onClick={() => navigate("/transaction")}>
              Add transactions
            </Button>
          </CardContent>
        )}
      </Card>
    </div>
  );
}

export default EmptyState;

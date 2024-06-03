import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser } from "@/hooks/useUser";

function TCard({ title, details }) {
  const { user } = useUser();
  const { currentValue, totalValue } = details;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Overall {title}</CardTitle>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="h-4 w-4 text-muted-foreground"
        >
          <rect width="20" height="14" x="2" y="5" rx="2" />
          <path d="M2 10h20" />
        </svg>
      </CardHeader>
      <CardContent>
        <div className="text-2xl mb-2 font-bold">
          {totalValue}
          {user?.currency?.sign}
        </div>
      </CardContent>
      <CardContent>
        <p className="text-sm font-medium mb-1">Current month {title}</p>
        <div className="text-2xl font-bold">
          {currentValue.value}
          {user?.currency?.sign}
        </div>
        <p className="text-xs text-muted-foreground">
          {currentValue?.percentage}
        </p>
      </CardContent>
    </Card>
  );
}

export default TCard;

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useSWR from "swr";
import { useEffect } from "react";
import { useState } from "react";

function TCard({ title, endPoint }) {
  //  const [data, setData] = useState([])

  const { data, error, isLoading } = useSWR(`/transaction/${endPoint}`);
  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>{error.response.data.message}</p>;

  function makePercentageText(percentageObj) {
    const { isLastNone, increase, value } = percentageObj;
    if (isLastNone) {
      return value;
    }
    if (increase) {
      return `+${value}% from last month`;
    }
    if (!increase && value) {
      return `-${value}% from last month`;
    }
    if (!increase && !value) {
      return `${value}% from last month`;
    }
  }
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
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
        <div className="text-2xl font-bold">${data?.value}</div>
        <p className="text-xs text-muted-foreground">
          {makePercentageText(data?.percentage)}
        </p>
      </CardContent>
    </Card>
  );
}

export default TCard;

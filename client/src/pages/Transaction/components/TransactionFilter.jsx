import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useTransaction } from "@/provider/transactionProvider";
import usePagination from "@/hooks/usePagination";

function TransactionFilter() {
  const { paginate, handleSearch, search, handleFilterType, filterType } =
    useTransaction();

  const { totalTransactions } = usePagination();

  return (
    <div className="relative">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />

      <div>
        <Input
          onChange={(e) => handleSearch(e.target.value)}
          placeholder={`${totalTransactions} Search result...`}
          className="pl-8"
          value={search}
        />
      </div>
      {/* Filter Transaction List */}
      <div className="flex sm:justify-end gap-2 mt-4">
        <Label>Sort By :</Label>
        <RadioGroup
          onValueChange={(value) => {
            handleFilterType(value);
            paginate(1);
          }}
          defaultValue={filterType}
          className="flex"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="all"
              id="r1"
              checked={filterType === "all"}
            />
            <Label htmlFor="r1">All</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="income"
              id="r2"
              checked={filterType === "income"}
            />
            <Label htmlFor="r2">Income</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="expense"
              id="r3"
              checked={filterType === "expense"}
            />
            <Label htmlFor="r3">Expense</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}

export default TransactionFilter;

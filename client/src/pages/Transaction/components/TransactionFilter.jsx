import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

function TransactionFilter({ setType, setSearch, type, search }) {
  return (
    <div className="w-[300px] relative">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search"
        className="pl-8"
        value={search}
      />
      {/* Filter Transaction List */}
      <div className="flex justify-end gap-3 mt-3">
        <Label>Sort By :</Label>
        <RadioGroup
          onValueChange={setType}
          defaultValue={type}
          className="flex"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="all" id="r1" checked={type === "all"} />
            <Label htmlFor="r1">All</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="income"
              id="r2"
              checked={type === "income"}
            />
            <Label htmlFor="r2">Income</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="expense"
              id="r3"
              checked={type === "expense"}
            />
            <Label htmlFor="r3">Expense</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}

export default TransactionFilter;

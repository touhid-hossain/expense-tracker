import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

import CustomCategory from "./CustomCategory";

const TransactionForm = () => {
  const [transactionCat, setTransactionCat] = useState(true);
  const form = useForm();
  return (
    <Card>
      <CardHeader>
        <CardTitle className="mb-2 text-center">
          Create a new transaction
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit((data) => console.log(data))}>
            {/* Transaction Name */}
            <FormField
              control={form.control}
              name="transactionName"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel>Transaction Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter transaction name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Transaction Type */}
            <FormField
              control={form.control}
              name="optionTypes"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel>Transaction Types</FormLabel>
                  <FormControl>
                    <Select {...field}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a Transaction Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Transaction Types</SelectLabel>
                          <SelectItem value="apple">Income</SelectItem>
                          <SelectItem value="banana">Expense</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Transaction Category */}
            <FormField
              control={form.control}
              name="optionTypes"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel>Transaction Category</FormLabel>
                  <FormControl>
                    <Select {...field}>
                      <SelectTrigger>
                        {transactionCat ? (
                          <SelectValue placeholder="Select a Income Category" />
                        ) : (
                          <SelectValue placeholder="Select a Expense Category" />
                        )}
                      </SelectTrigger>
                      <SelectContent>
                        {transactionCat ? (
                          <SelectGroup>
                            <SelectLabel>Income Categories</SelectLabel>
                            <SelectItem value="apple">Salary</SelectItem>
                            <SelectItem value="banana">Sold Land</SelectItem>
                            <SelectItem value="banana">
                              Pension Money
                            </SelectItem>
                            {/* Add Income Custom Category */}
                            <CustomCategory />
                          </SelectGroup>
                        ) : (
                          <SelectGroup>
                            <SelectLabel>Expense Categories</SelectLabel>
                            <SelectItem value="apple">House Rent</SelectItem>
                            <SelectItem value="banana">Gas Bill</SelectItem>
                            <SelectItem value="banana">Water Bill</SelectItem>
                            <SelectItem value="banana">Hooker Bill</SelectItem>
                            {/* Add Expense Custom Category */}
                            <CustomCategory />
                          </SelectGroup>
                        )}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Transaction Amount */}
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel>Transaction Amount</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter amount"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="mt-5 w-full" type="submit">
              Submit
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default TransactionForm;

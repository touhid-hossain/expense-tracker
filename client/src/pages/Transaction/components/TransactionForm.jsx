import React, { useEffect, useState } from "react";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";

// const transactionCategories = [

//   {
//     _id: 1,
//     name: "Salary",
//     type: "income",
//   },
//   {
//     _id: 2,
//     name: "Sold Land",
//     type: "income",
//   },
//   {
//     _id: 3,
//     name: "Pension Money",
//     type: "income",
//   },
//   {
//     _id: 4,
//     name: "Gas Bill",
//     type: "expense",
//   },
//   {
//     _id: 5,
//     name: "Water Bill",
//     type: "expense",
//   },
//   {
//     _id: 6,
//     name: "Hooker Bill",
//     type: "expense",
//   },
// ];

// transactionCategories.map((g) => g.incomes.map((result)=> console.log(result)))

// We have to send this url to the database for query list.  GET = http://localhost:5000/api/v1/category/?type={expense}

// Transaction form schema

const transactionFormSchema = z.object({
  transactionName: z.string().min(4, {
    message: "This field contain at least 1 character(6).",
  }),
  transactionType: z.string().min(1, {
    message: "Select a transaction type",
  }),
  transactionCategories: z.string().min(1, {
    message: "Select at least one category",
  }),
  transactionAmount: z
    .string()
    .min(1, { message: "At least put one figure of amount" }),
});

const TransactionForm = () => {
  const [transactionType, setTransactionType] = useState("income");
  const [categoryList, setCategoryList] = useState([]);
  const [openCustomCategory, setOpenCustomCategory] = useState(false);
  const form = useForm({
    resolver: zodResolver(transactionFormSchema),
    defaultValues: {
      transactionName: "",
      transactionType: "income",
      transactionCategories: "",
      transactionAmount: "",
    },
  });

  // Fetch all category by query
  const getCategoryListByType = async () => {
    const res = await axios.get(
      `http://localhost:5000/api/v1/category/?type=${transactionType}`
    );

    setCategoryList(res?.data.categories);
  };

  // Fetch TypeData on every type change
  useEffect(() => {
    getCategoryListByType();
  }, [transactionType]);


  // Create New Transaction
  const createNewTransaction = async (values) => {
    const { data: newData } = await axios.post(
      "http://localhost:5000/api/v1/transaction",
      {
        name: values.transactionName,
        type: transactionType,
        category:values.transactionCategories,
        amount: values.transactionAmount
      }
    );
    
    console.log('New TransactionList Created at Mongo', newData)

    // setCategoryList([...categoryList, newData?.category]);

  }
  console.log("2nd change from antareep branch test different file")

  return (
    <Card>
      <CardHeader>
        <CardTitle className="mb-2 text-center">
          Create a new transaction
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          {/* Transaction Name */}
          <form onSubmit={form.handleSubmit(createNewTransaction)}>
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
              name="transactionType"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel>Transaction Types</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => {
                        setTransactionType(value); // Update the transactionType state
                        field.onChange(value); // Update the form field value
                      }}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a Transaction Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Transaction Types</SelectLabel>
                          <SelectItem value="income">Income</SelectItem>
                          <SelectItem value="expense">Expense</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Transaction Category */}

            {transactionType ? (
              <FormField
                control={form.control}
                name="transactionCategories"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Transaction Category</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          {transactionType === "income" ? (
                            <SelectValue placeholder="Select a Income Category" />
                          ) : transactionType === "expense" ? (
                            <SelectValue placeholder="Select a Expense Category" />
                          ) : null}
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <div className="flex justify-between items-center">
                              {transactionType === "income" ? (
                                <SelectLabel>Income Categories</SelectLabel>
                              ) : (
                                <SelectLabel>Expense Categories</SelectLabel>
                              )}
                              {/* Add Income Custom Category */}
                              <CustomCategory
                                categoryList={categoryList}
                                setCategoryList={setCategoryList}
                                transactionType={transactionType}
                                open={openCustomCategory}
                                setOpen={setOpenCustomCategory}
                              />
                            </div>
                            {categoryList?.map((category) => {
                              if (category.type === transactionType) {
                                return (
                                  <SelectItem
                                    key={category._id}
                                    value={category._id}
                                  >
                                    {category.name}
                                  </SelectItem>
                                );
                              }
                            })}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : null}
            {/* Transaction Amount */}
            <FormField
              control={form.control}
              name="transactionAmount"
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

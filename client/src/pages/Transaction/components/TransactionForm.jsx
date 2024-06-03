import React from "react";
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
import { useTransaction } from "@/provider/transactionProvider";
import useTransactionForm from "@/hooks/useTransactionForm";

const TransactionForm = ({ buttonText, isEditMode, handler }) => {
  const { selectedTransaction } = useTransaction();
  const { form, categoryList, transactionType } = useTransactionForm(
    isEditMode && selectedTransaction
  );

  return (
    <Form {...form}>
      {/* Transaction Name */}
      <form onSubmit={form.handleSubmit(handler)}>
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
            // console.log(field)
            <FormItem className="mb-4">
              <FormLabel>Transaction Types</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    form.setValue("transactionCategories", "");
                  }}
                  value={field.value}
                  // defaultValue={field.value} // The default is creating issues, Its not updating at all
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

        {transactionType && (
          <FormField
            control={form.control}
            name="transactionCategories"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Transaction Category</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          transactionType === "income"
                            ? "Select a Income Category"
                            : "Select a Expense Category"
                        }
                      />
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
                          <div>
                            <CustomCategory transactionType={transactionType} />
                          </div>
                        </div>
                        {categoryList?.map((category) => {
                          if (category.type === transactionType) {
                            return (
                              <SelectItem
                                key={category._id}
                                value={category._id} // 65fc86f410a53f8260825bfc
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
        )}
        {/* Transaction Amount */}
        <FormField
          control={form.control}
          name="transactionAmount"
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormLabel>Transaction Amount</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Enter amount" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="mt-5 w-full" type="submit">
          {buttonText}
        </Button>
      </form>
    </Form>
  );
};

export default TransactionForm;

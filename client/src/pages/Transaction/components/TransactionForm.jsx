import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";
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
import useTransactionForm from "@/hooks/useTransactionForm";

const TransactionForm = (props) => {
  const {
    form,
    formTitle,
    categoryList,
    transactionType,
    isOpenErrorPopUp,
    formSubmitButtonText,
    formSubmitHandler,
    handleToggleErrorDialog,
  } = useTransactionForm(props);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="mb-2 text-center">{formTitle}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          {/* Transaction Name */}
          <form onSubmit={form.handleSubmit(formSubmitHandler)}>
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
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
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
                                <CustomCategory
                                  transactionType={transactionType}
                                />
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
              {formSubmitButtonText}
            </Button>
          </form>
        </Form>

        <ErrorDiaLog
          isOpenErrorPopUp={isOpenErrorPopUp}
          handleToggleErrorDialog={handleToggleErrorDialog}
        />
      </CardContent>
    </Card>
  );
};

function ErrorDiaLog({ isOpenErrorPopUp, handleToggleErrorDialog }) {
  return (
    <Dialog open={isOpenErrorPopUp}>
      <DialogContent className="bg-red-400">
        <div
          onClick={handleToggleErrorDialog}
          className="cursor-pointer relative rounded-sm opacity-60 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none  focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
        >
          <X className="absolute right-[-15px] top-[-15px] h-5 w-5 rounded-md bg-rose-600 p-[2px] text-white " />
        </div>
        <p className="bg-red-800 p-2 rounded-lg text-center text-white">
          Unsufficient Fund!
        </p>
      </DialogContent>
    </Dialog>
  );
}

export default TransactionForm;

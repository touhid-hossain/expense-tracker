import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

// Transaction form schema
const newTransactionFormSchema = z.object({
  transactionName: z.string().min(2, {
    message: "This field contain at least 1 character(6).",
  }),
});

const CustomCategory = ({
  transactionType,
  open,
  setOpen,
  categoryList,
  setCategoryList,
}) => {
  const form = useForm({
    resolver: zodResolver(newTransactionFormSchema),
    defaultValues: {
      transactionName: "",
    },
  });

  const customTransaction = async (values) => {
    console.log("Created New Category", values);

    const { data: newData } = await axios.post(
      "http://localhost:5000/api/v1/category/create",
      {
        name: values.transactionName,
        type: transactionType,
      }
    );

    setCategoryList([newData?.category, ...categoryList]);
    console.log("Antareep Changes from branch ")
    setOpen(false);

  };

  return (
    <Dialog open={open}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setOpen(true)}>
          + Add new category
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              Create a new category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(customTransaction)}>
                {/* Transaction Name */}
                <FormField
                  control={form.control}
                  name="transactionName"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>Category Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter category name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-between items-center mt-6">
                  <DialogFooter className="sm:justify-start ">
                    <DialogClose asChild>
                      <Button
                        onClick={() => setOpen(false)}
                        type="button"
                        variant="destructive"
                      >
                        Cancel
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                  <Button type="submit">Create</Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default CustomCategory;

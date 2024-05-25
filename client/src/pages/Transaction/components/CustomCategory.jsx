import { useState } from "react";
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
import axios from "@/lib/axios";
import { useSWRConfig } from "swr";

// Transaction form schema
const newTransactionFormSchema = z.object({
  transactionName: z.string().min(2, {
    message: "This field contain at least 1 character(6).",
  }),
});

const CustomCategory = ({ transactionType }) => {
  const form = useForm({
    resolver: zodResolver(newTransactionFormSchema),
    defaultValues: {
      transactionName: "",
    },
  });

  const [openCustomCategory, setOpenCustomCategory] = useState(false);
  const { mutate } = useSWRConfig();

  const customTransaction = async (values) => {
    const { data: newData } = await axios.post("/category/create", {
      name: values.transactionName,
      type: transactionType,
    });

    mutate(
      `/category/?type=${transactionType}`,
      async (data) => {
        return {
          ...data,
          categories: [newData?.category, ...data?.categories],
        };
      },
      { revalidate: false }
    );
    setOpenCustomCategory(false);
  };

  return (
    <Dialog open={openCustomCategory}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setOpenCustomCategory(true)}>
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
                        onClick={() => setOpenCustomCategory(false)}
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

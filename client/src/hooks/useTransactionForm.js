import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useSWR from "swr";
import { useTransaction } from "@/provider/transactionProvider";

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
    .min(1, { message: "At least put one figure of amount" })
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val) && val !== 0, {
      message: "Input must be a number and must not be 0",
    }),
});

const useTransactionForm = (selectedTransaction) => {
  const { handleToggleErrorDialog, isOpenErrorPopUp } = useTransaction();

  const form = useForm({
    resolver: zodResolver(transactionFormSchema),

    defaultValues: selectedTransaction
      ? {
          transactionName: selectedTransaction.name,
          transactionType: selectedTransaction.type,
          transactionCategories: selectedTransaction.category,
          transactionAmount: selectedTransaction.amount,
        }
      : undefined,
  });

  const transactionType = form.watch("transactionType");

  const { data: categoryList = [] } = useSWR(
    transactionType ? `/category/?type=${transactionType}` : null
  );

  return {
    form,
    transactionType,
    isOpenErrorPopUp,
    categoryList: categoryList?.categories,
    handleToggleErrorDialog,
  };
};
export default useTransactionForm;

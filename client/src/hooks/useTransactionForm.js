import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect } from "react";
import axios from "@/lib/axios";
import useGetTotal from "@/hooks/useGetTotal";
import useSWRTransaction from "@/hooks/useSWRTransaction";
import useSWR, { useSWRConfig } from "swr";
import { useTransaction } from "@/provider/transactionProvider";
import usePagination from "./usePagination";

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
  const {
    toggleTransactionForm,
    handleToggleErrorDialog,
    isOpenErrorPopUp,
    openErrorDialog,
  } = useTransaction();
  const { totalIncome, totalExpense, available } = useGetTotal();
  const { updateTransactionMutation } = useSWRTransaction();
  const { mutate } = useSWRConfig();

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

  const { data: categoryList } = useSWR(
    transactionType ? `/category/?type=${transactionType}` : null
  );

  // Create New Transaction
  const createNewTransaction = async (values) => {
    if (values.transactionType === "expense") {
      const newExpense = +values.transactionAmount;
      if (available < newExpense) {
        return openErrorDialog();
      }
    }

    await axios.post("/transaction", {
      name: values.transactionName,
      type: values.transactionType,
      category: values.transactionCategories,
      amount: values.transactionAmount,
    });

    mutate((key) => typeof key === "string" && key.startsWith("/transaction"));
    toggleTransactionForm();
  };

  // Edit Transaction
  const updateTransaction = async (values) => {
    if (selectedTransaction.type === "expense") {
      if (form.formState.dirtyFields.transactionAmount) {
        const formExpenseValue = +values.transactionAmount;
        const selectedExpenseValue = +selectedTransaction.amount;

        // Increase Expense Value
        if (formExpenseValue > selectedExpenseValue) {
          const expenseValue = formExpenseValue - selectedExpenseValue;
          const newExpense = totalExpense + expenseValue;
          const newSaved = totalIncome - newExpense;
          if (newSaved < 0) {
            return openErrorDialog();
          }
        }
      }
    }

    if (selectedTransaction.type === "income") {
      if (values.transactionType === "expense") {
        const formExpenseValue = +values.transactionAmount;
        const selectedExpenseValue = +selectedTransaction.amount;
        const newIncome = totalIncome - selectedExpenseValue;
        const newExpense = totalExpense + formExpenseValue;
        const newSaved = newIncome - newExpense;

        if (newSaved < 0) {
          return openErrorDialog();
        }
      }
    }

    updateTransactionMutation({
      name: values.transactionName,
      type: values.transactionType,
      category: values.transactionCategories,
      amount: values.transactionAmount,
      id: selectedTransaction?._id,
    });

    // if (!isPaginateValidating) {
    //   toggleEditForm();
    //   handleSelectUpdateTransaction(null, false);
    // }
  };

  return {
    form,
    transactionType,
    isOpenErrorPopUp,
    categoryList: categoryList?.categories,
    handleToggleErrorDialog,
    updateTransaction,
    createNewTransaction,
  };
};
export default useTransactionForm;

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useEffect } from "react";
import axios from "@/lib/axios";
import useGetTotal from "@/hooks/useGetTotal";
import useSWRTransaction from "@/hooks/useSWRTransaction";
import useSWR, { useSWRConfig } from "swr";

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

const useTransactionForm = ({
  isEditMode,
  toggleTransactionForm,
  toggleEditForm,
  selectedTransaction,
  handleSelectUpdateTransaction,
}) => {
  const [isOpenErrorPopUp, setIsOpenErrorPopUp] = useState(false);

  const { totalIncome, totalExpense, available } = useGetTotal();
  const { updateTransactionMutation } = useSWRTransaction();
  const { mutate } = useSWRConfig();

  const form = useForm({
    resolver: zodResolver(transactionFormSchema),
    defaultValues: {
      transactionName: "",
      transactionType: "",
      transactionCategories: "",
      transactionAmount: "",
    },
  });

  // toggle erorr dialog
  const handleToggleErrorDialog = () =>
    setIsOpenErrorPopUp((prevState) => !prevState);

  const transactionType = form.watch("transactionType");

  const { data: categoryList } = useSWR(
    transactionType ? `/category/?type=${transactionType}` : null
  );

  useEffect(() => {
    if (isEditMode) {
      form.setValue("transactionName", selectedTransaction.name);
      form.setValue("transactionType", selectedTransaction.type);
      form.setValue("transactionCategories", selectedTransaction.category);
      form.setValue("transactionAmount", selectedTransaction.amount);
    } else {
      form.reset();
    }
  }, []);

  // Create New Transaction
  const createNewTransaction = async (values) => {
    if (transactionType === "expense") {
      const newExpense = +values.transactionAmount;
      if (available < newExpense) {
        return setIsOpenErrorPopUp(true);
      }
    }

    await axios.post("/transaction", {
      name: values.transactionName,
      type: transactionType,
      category: values.transactionCategories,
      amount: values.transactionAmount,
    });

    mutate((key) => typeof key === "string" && key.startsWith("/transaction"));
    toggleTransactionForm();
  };

  // Edit Transaction
  const updateTransaction = (values) => {
    if (transactionType === "expense") {
      // Expense value increase/decrease
      const newExpense = +values.transactionAmount;

      if (available < newExpense) {
        return setIsOpenErrorPopUp(true);
      }
      //  Income => Expense Transformation
      if (selectedTransaction.type === "income") {
        const newIncome = totalIncome - newExpense;

        if (newIncome < totalExpense) {
          return setIsOpenErrorPopUp(true);
        }
      }
    }

    updateTransactionMutation({
      name: values.transactionName,
      type: transactionType,
      category: values.transactionCategories,
      amount: values.transactionAmount,
      id: selectedTransaction?._id,
    });
    toggleEditForm();
    handleSelectUpdateTransaction(null, false);
  };

  return {
    form,
    formSubmitButtonText: isEditMode ? "Update" : "Submit",
    formTitle: isEditMode ? "Update Transaction" : "Create a new transaction",
    transactionType,
    isOpenErrorPopUp,
    categoryList: categoryList?.categories,
    updateTransaction,
    createNewTransaction,
    handleToggleErrorDialog,
    formSubmitHandler: isEditMode ? updateTransaction : createNewTransaction,
  };
};
export default useTransactionForm;

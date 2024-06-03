import axios from "@/lib/axios";
import { toast } from "@/components/ui/use-toast";
import { useSWRConfig } from "swr";
import { useTransaction } from "@/provider/transactionProvider";
import useSWRMutation from "swr/mutation";
import useGetTotal from "./useGetTotal";

const createTransactionRequest = async (url, { arg: transaction }) => {
  await axios.post(url, {
    name: transaction.transactionName,
    type: transaction.transactionType,
    category: transaction.transactionCategories,
    amount: transaction.transactionAmount,
  });
};

const updateRequest = async (url, { arg: updatedTransaction }) => {
  await axios.put(`${url}/${updatedTransaction.id}`, updatedTransaction);
};

const deleteRequest = async (url, { arg: id }) => {
  await axios.delete(`${url}/${id}`);
};

function useSWRTransaction() {
  const {
    toggleEditForm,
    toggleTransactionForm,
    handleSelectUpdateTransaction,
  } = useTransaction();
  const { mutate } = useSWRConfig();
  const { available, totalExpense, totalIncome } = useGetTotal();
  const { trigger: createTransaction, isMutating: isCreating } = useSWRMutation(
    "/transaction",
    createTransactionRequest
  );

  const { trigger: updateTransaction, isMutating: isUpdating } = useSWRMutation(
    "/transaction/edit-transaction",
    updateRequest
  );

  const { trigger: deleteTransaction, isMutating: isDeleting } = useSWRMutation(
    "/transaction/delete-transaction",
    deleteRequest
  );

  const { selectedTransaction, openErrorDialog } = useTransaction();

  const deleteTransactionHandler = async (id) => {
    try {
      await deleteTransaction(id);
      mutate(
        (key) => typeof key === "string" && key.startsWith("/transaction?page=")
      );

      toast({
        title: "Transaction Deleted Successfully",
        variant: "success",
      });
    } catch (error) {
      toast({
        title: error.message,
        variant: "destructive",
      });
    }
  };

  // Create New Transaction
  const createTransactionHandler = async (values) => {
    if (values.transactionType === "expense") {
      const newExpense = +values.transactionAmount;
      if (available < newExpense) {
        return openErrorDialog();
      }
    }
    //  Remote mutation
    await createTransaction(values);

    // Local mutation and re-validation
    mutate((key) => typeof key === "string" && key.startsWith("/transaction"));
    toggleTransactionForm();
  };

  // Edit Transaction
  const updateTransactionHandler = async (values) => {
    if (selectedTransaction.type === "expense") {
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

    if (selectedTransaction.type === "income") {
      if (values.transactionType === "expense") {
        const formExpenseValue = +values.transactionAmount;
        const newIncome = totalIncome - formExpenseValue;
        const newExpense = totalExpense + formExpenseValue;
        const newSaved = newIncome - newExpense;

        if (newSaved < 0) {
          return openErrorDialog();
        }
      }
    }

    // // Remote mutation

    await updateTransaction({
      name: values.transactionName,
      type: values.transactionType,
      category: values.transactionCategories,
      amount: values.transactionAmount,
      id: selectedTransaction?._id,
    });

    mutate(
      (key) => typeof key === "string" && key.startsWith("/transaction?page=")
    );

    toggleEditForm();
    handleSelectUpdateTransaction(null, false);
  };

  return {
    deleteTransactionHandler,
    updateTransactionHandler,
    createTransactionHandler,
    isCreating,
    isUpdating,
    isDeleting,
  };
}

export default useSWRTransaction;

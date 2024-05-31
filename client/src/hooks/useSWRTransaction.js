import axios from "@/lib/axios";
import { toast } from "@/components/ui/use-toast";
import { useSWRConfig } from "swr";
import { useTransaction } from "@/provider/transactionProvider";

function useSWRTransaction() {
  const { toggleEditForm, handleSelectUpdateTransaction } = useTransaction();
  const { mutate } = useSWRConfig();

  const deleteTransaction = async (id) => {
    try {
      await axios.delete(`/transaction/delete-transaction/${id}`);
      await mutate(
        (key) => typeof key === "string" && key.startsWith("/transaction?page=")
        // Local mutation function
        // should be return updated data that updated local cached data
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

  const updateTransactionMutation = async (updatedTransaction) => {
    try {
      await mutate(
        (key) =>
          typeof key === "string" && key.startsWith("/transaction?page="),
        // It's occur remote mutation and update the local cache
        async (transactions) => {
          const url = `/transaction/edit-transaction/${updatedTransaction.id}`; // Assuming the correct API endpoint

          const { data } = await axios.put(url, updatedTransaction);

          const transactionList = transactions.transactions;

          const newT = transactionList.map((t) => {
            if (t._id === updatedTransaction.id) {
              return { ...t, ...data.updatedTransaction };
            }
            return t;
          });

          return {
            ...transactions,
            transactions: newT,
          };
        },
        {
          revalidate: true,
        }
      );
      toggleEditForm();
      handleSelectUpdateTransaction(null, false);
      toast({
        title: "Transaction Updated Successfully",
        variant: "success",
      });
    } catch (error) {
      toast({
        title: error.message,
        variant: "destructive",
      });
    }
  };

  return {
    deleteTransaction,
    updateTransactionMutation,
  };
}

export default useSWRTransaction;

import useSWR from "swr";
import axios from "@/lib/axios";
import { toast } from "@/components/ui/use-toast";

function useSWRTransaction() {
  const { data, mutate } = useSWR("/transaction");

  const creatTransactionMutation = async (t) => {
    mutate(() => axios.post("/transaction", t));
  };

  const updateTransactionMutation = async ({ id, ...rest }) => {
    try {
      await mutate(
        () => {
          const url = `/transaction/edit-transaction/${id}`; // Assuming the correct API endpoint
          return axios.put(url, rest);
        },
        {
          populateCache: (updatedTransaction, transactions) => {
            const transactionList = transactions.transactions;

            const newT = transactionList.map((t) => {
              if (t._id === id) {
                return { ...t, ...updatedTransaction.data.updatedTransaction };
              }
              return t;
            });

            return {
              ...transactions,
              transactions: newT,
            };
          },
          // Since the API already gives us the updated information,
          // we don't need to revalidate here.
          revalidate: false,
        }
      );
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
    transactionList: data?.transactions ? data.transactions : [],
    creatTransactionMutation,
    updateTransactionMutation,
  };
}

export default useSWRTransaction;

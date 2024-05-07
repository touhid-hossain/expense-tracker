import useSWR from "swr";

function useGetTotal() {
  const { data: income } = useSWR("/transaction/total-income");
  const { data: expense } = useSWR("/transaction/total-expense");
  const { data: available } = useSWR("/transaction/total-saved");
  return {
    totalIncome: income?.value,
    totalExpense: expense?.value,
    available: available?.value,
  };
}

export default useGetTotal;

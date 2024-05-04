import useSWR from "swr";

function useGetTotal() {
  const { data: income } = useSWR("/transaction/total-income");
  const { data: expense } = useSWR("/transaction/total-expense");
  const available = income?.value - expense?.value;
  return {
    totalIncome: income?.value,
    totalExpense: expense?.value,
    available,
  };
}

export default useGetTotal;

import useSWR from "swr";

function useGetTotal() {
  const { data } = useSWR("/transaction/total-details");

  return {
    totalIncome: data?.totalIncome,
    totalExpense: data?.totalExpense,
    available: +data?.totalSaved,
  };
}

export default useGetTotal;

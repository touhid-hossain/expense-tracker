import useSWR from "swr";

function useGetTotal() {
  const { data } = useSWR("/transaction/total-details");
  const { data: currentDetails } = useSWR("/transaction/current-details");

  return {
    totalIncome: data?.totalIncome,
    totalExpense: data?.totalExpense,
    available: +data?.totalSaved + +currentDetails?.savedDetail,
  };
}

export default useGetTotal;

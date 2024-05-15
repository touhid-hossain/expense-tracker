import useSWR from "swr";

function useGetTotal() {
  const { data } = useSWR("/transaction/total-details");

  return {
    totalIncome: data?.incomeDetail?.value,
    totalExpense: data?.expenseDetail?.value,
    available: data?.savedDetail?.value,
  };
}

export default useGetTotal;

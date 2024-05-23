import useSWR from "swr";

function usePagination({ currentPage, limit, filterBy }) {
  const getPaginateKey = () => {
    if (filterBy) {
      const { type, search } = filterBy;

      if (type || search) {
        return `/transaction?page=${currentPage}&limit=${limit}&type=${type}&search=${search}`;
      }
    }

    return `/transaction?page=${currentPage}&limit=${limit}`;
  };

  const { data, isLoading } = useSWR(getPaginateKey());

  const transactionList = data?.transactions ? data.transactions : [];

  return {
    transactionList,
    totalTransactions: data?.totalTransactions,
    isLoading,
  };
}

export default usePagination;

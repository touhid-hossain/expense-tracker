import useSWR from "swr";

function usePagination({ currentPage, limit, filterOptions }) {
  const getPaginateKey = () => {
    if (filterOptions) {
      const { type, search } = filterOptions;

      return `/transaction?page=${currentPage}&limit=${limit}&type=${type}&search=${search}`;
    }

    return `/transaction?page=${currentPage}&limit=${limit}`;
  };

  const { data, isLoading } = useSWR(getPaginateKey());

  const transactionList = data?.transactions ? data.transactions : [];
  const totalTransactions = data?.totalTransactions;

  const totalPages = Math.ceil(totalTransactions / limit);
  const pagesToShow = totalPages > 5 ? 5 : totalPages;

  return {
    transactionList,
    totalTransactions,
    totalPages,
    pagesToShow,
    isLoading,
  };
}

export default usePagination;

import useSWR from "swr";

function usePagination({ currentPage, limit, filterOptions }) {
  let PAGINATE_LIMIT = limit ? limit : 2;

  const getPaginateKey = () => {
    if (filterOptions) {
      const { type, search } = filterOptions;

      return `/transaction?page=${currentPage}&limit=${PAGINATE_LIMIT}&type=${type}&search=${search}`;
    }

    return `/transaction?page=${currentPage}&limit=${PAGINATE_LIMIT}`;
  };

  const { data, isLoading } = useSWR(getPaginateKey());

  const transactionList = data?.transactions ? data.transactions : [];
  const totalTransactions = !isLoading && data.totalTransactions;

  const totalPages = Math.ceil(totalTransactions / PAGINATE_LIMIT);
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

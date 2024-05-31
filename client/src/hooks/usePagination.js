import { useTransaction } from "@/provider/transactionProvider";
import useSWR from "swr";

function usePagination(props) {
  const { currentPage, filterType, debouncedSearch } = useTransaction();
  const PAGINATE_LIMIT = props?.limit ? props?.limit : 2;
  const page = props?.isNextPage ? currentPage + 1 : currentPage;

  const getPaginateKey = () => {
    if (props?.isPageOne) {
      return `/transaction?page=1&limit=${PAGINATE_LIMIT}`;
    }
    return `/transaction?page=${page}&limit=${PAGINATE_LIMIT}&type=${filterType}&search=${debouncedSearch}`;
  };

  const { data, isLoading, isValidating } = useSWR(getPaginateKey());

  const transactionList = data?.transactions ? data.transactions : [];
  const totalTransactions = data?.totalTransactions
    ? data.totalTransactions
    : 0;

  const totalPages = Math.ceil(totalTransactions / PAGINATE_LIMIT);
  const pagesToShow = totalPages > 5 ? 5 : totalPages;

  return {
    transactionList,
    totalTransactions,
    totalPages,
    pagesToShow,
    isPaginateLoading: isLoading,
    isPaginateValidating: isValidating,
  };
}

export default usePagination;

import useDebounce from "@/hooks/useDebounce";
import { createContext, useContext, useState } from "react";

// Create Transaction Context
const TransactionContext = createContext();

// TransactionProvider Component
const TransactionProvider = ({ children }) => {
  const PAGINATE_LIMIT = 2;
  const [type, setType] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [search, setSearch] = useState("");
  const [time, setTime] = useState("yearly");
  const [currentPage, setCurrentPage] = useState(1);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const handleFilterType = (type) => setFilterType(type);
  const handleSearch = (value) => setSearch(value);

  const debouncedSearch = useDebounce(search, 1000, () => {
    paginate(1);
  });

  const handleTimeChange = (e) => {
    setTime(e);
  };

  const handleTypeChange = (type) => {
    setType(type);
  };

  const value = {
    time,
    type,
    currentPage,
    handleTimeChange,
    handleTypeChange,
    paginate,
    handleFilterType,
    handleSearch,
    filterType,
    debouncedSearch,
    PAGINATE_LIMIT,
  };

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
};

// create custom hook for consume context value
export const useTransaction = () => {
  return useContext(TransactionContext);
};

export default TransactionProvider;

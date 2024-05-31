import useDebounce from "@/hooks/useDebounce";
import { createContext, useContext, useState } from "react";

// Create Transaction Context
const TransactionContext = createContext();

// TransactionProvider Component
const TransactionProvider = ({ children }) => {
  const [type, setType] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [search, setSearch] = useState("");
  const [time, setTime] = useState("yearly");
  const [currentPage, setCurrentPage] = useState(1);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const handleFilterType = (type) => setFilterType(type);
  const handleSearch = (value) => setSearch(value);

  const [transactionFormOpen, setTransactionFormOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isOpenErrorPopUp, setIsOpenErrorPopUp] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  //  open/close transaction form
  const toggleTransactionForm = () =>
    setTransactionFormOpen((prevState) => !prevState);
  const toggleEditForm = () => setIsEditMode((prevState) => !prevState);

  // selected transaction handler
  const handleSelectUpdateTransaction = (t, isOpenDialog = true) => {
    setSelectedTransaction(t);
    isOpenDialog && toggleEditForm();
  };

  // toggle erorr dialog
  const handleToggleErrorDialog = () =>
    setIsOpenErrorPopUp((prevState) => !prevState);

  const openErrorDialog = () => setIsOpenErrorPopUp(true);

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
    isEditMode,
    filterType,
    currentPage,
    debouncedSearch,
    isOpenErrorPopUp,
    selectedTransaction,
    transactionFormOpen,
    paginate,
    handleSearch,
    handleTimeChange,
    handleTypeChange,
    handleFilterType,
    toggleEditForm,
    openErrorDialog,
    toggleTransactionForm,
    handleToggleErrorDialog,
    handleSelectUpdateTransaction,
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

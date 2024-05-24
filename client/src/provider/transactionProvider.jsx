import { createContext, useContext, useState } from "react";

// Create Transaction Context
const TransactionContext = createContext();

// TransactionProvider Component
const TransactionProvider = ({ children }) => {
  const [type, setType] = useState("all");
  const [search, setSearch] = useState("");
  const [transactionFormOpen, setTransactionFormOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const handleT = (value) => setTotalPaginateT(value);

  const [time, setTime] = useState("yearly");
  // const [type, setType] = useState("all");

  const [currentPage, setCurrentPage] = useState(1);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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

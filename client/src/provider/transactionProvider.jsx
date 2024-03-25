import { createContext, useContext, useMemo, useState } from "react";

// Create Transaction Context
const TransactionContext = createContext();

// TransactionProvider Component
const TransactionProvider = ({ children }) => {
  const [transactionList, setTransactionList] = useState([]);

  const updateTransaction = (newTransactionList) => {
    setTransactionList(newTransactionList);
  }

  // passing values in this value obj.
  const value = useMemo(
    () => ({
      transactionList,
      setTransactionList: updateTransaction,
    })
  );

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

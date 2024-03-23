// const { createContext } = require("react");

import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

// Create Transaction Context
const TransactionContext = createContext();

// create custom hook for consume context value
export const TransactionListContext = () => {
  return useContext(TransactionContext);
};

// TransactionProvider Component
const TransactionProvider = ({ children }) => {
  const [transactionList, setTransactionList] = useState([]);

  // Fetch transactionList after creating a new transaction
  useEffect(() => {
    const getTransactionsList = async () => {
      const response = await axios.get(
        "http://localhost:5000/api/v1/transaction"
      );
      setTransactionList(response?.data?.transactions);
    };
    getTransactionsList();
  }, []);

  // passing values in this value obj.
  const value = {
    transactionList,
    setTransactionList,
  };
  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
};

export default TransactionProvider;

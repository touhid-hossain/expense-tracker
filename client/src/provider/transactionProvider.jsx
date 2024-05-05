import axios from "@/lib/axios";
import { createContext, useContext, useState } from "react";

// Create Transaction Context
const TransactionContext = createContext();

// TransactionProvider Component
const TransactionProvider = ({ children }) => {
  const [transactionList, setTransactionList] = useState([]);
  const [summaryData, setSummaryData] = useState([]);
  const [updatedTotalTransaction, setTotalTransactions] = useState(0);
  const [currentTotalTransactions, setCurrentTotalTransactions] = useState(0);

  const [time, setTime] = useState("yearly");
  const [type, setType] = useState("all");

  // Delete transaction-list
  const deleteTransaction = async (id) => {
    try {
      await axios.delete(`/transaction/delete-transaction/${id}`);
      setTransactionList(transactionList.filter((t) => t._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSummary = async () => {
    const { data } = await axios.get(`/transaction/summary/${time}`);
    setSummaryData(data?.data);
  };
  const fetchCurrentMonthTransactions = async () => {
    const { data } = await axios.get("/transaction/currentMonth/transactions");
    setCurrentTotalTransactions(data);
  };
  const handleTimeChange = (e) => {
    setTime(e);
  };

  const handleTypeChange = (type) => {
    setType(type);
  };

  const value = {
    transactionList,
    setTransactionList,
    updatedTotalTransaction,
    setTotalTransactions,
    time,
    type,
    handleTimeChange,
    handleTypeChange,
    summaryData,
    fetchSummary,
    fetchCurrentMonthTransactions,
    currentTotalTransactions,
    deleteTransaction,
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

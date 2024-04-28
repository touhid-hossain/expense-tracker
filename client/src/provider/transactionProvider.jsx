import axios from "@/lib/axios";
import { useEffect } from "react";
import { createContext, useContext, useState } from "react";

// Create Transaction Context
const TransactionContext = createContext();

// TransactionProvider Component
const TransactionProvider = ({ children }) => {
  const [transactionList, setTransactionList] = useState([]);
  const [summaryData, setSummaryData] = useState([]);
  const [updatedTotalTransaction, setTotalTransactions] = useState(0);
  const [currentTotalTransactions, setcurrentTotalTransactions] = useState(0);

  const [totalIncomeDetails, setTotalIncomeDetails] = useState(null);
  const [totalExpenseDetails, setTotalExpenseDetails] = useState(null);
  const [totalSavedDetails, setTotalSavedDetails] = useState(null);

  const [time, setTime] = useState("yearly");
  const [type, setType] = useState("all");

  const fetchSummary = async () => {
    const { data } = await axios.get(`/transaction/summary/${time}`);
    setSummaryData(data?.data);
  };

  const fetchIncomeDetials = async () => {
    console.log("income called");
    const { data } = await axios.get("/transaction/total-income");
    setTotalIncomeDetails(data);
  };
  const fetchExpenseDetials = async () => {
    console.log("expense called");
    const { data } = await axios.get("/transaction/total-expense");
    setTotalExpenseDetails(data);
  };

  const fetchSavedDetials = async () => {
    console.log("saved called");
    const { data } = await axios.get("/transaction/total-saved");
    setTotalSavedDetails(data);
  };

  const fetchcurrentMonthTransactions = async () => {
    const { data } = await axios.get("/transaction/currentMonth/transactions");
    setcurrentTotalTransactions(data);
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
    totalIncomeDetails,
    totalExpenseDetails,
    totalSavedDetails,
    fetchIncomeDetials,
    fetchExpenseDetials,
    fetchSavedDetials,
    fetchcurrentMonthTransactions,
    currentTotalTransactions,
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

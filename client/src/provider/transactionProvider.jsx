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

  const [totalIncomeDetails, setTotalIncomeDetails] = useState(null);
  const [totalIncomeLoading, setTotalIncomeLoading] = useState(true);
  const [totalExpenseDetails, setTotalExpenseDetails] = useState(null);
  const [totalExpenseLoading, setTotalExpenseLoading] = useState(true);
  const [totalSavedDetails, setTotalSavedDetails] = useState(null);
  const [totalSavedLoading, setTotalSavedLoading] = useState(true);

  const [time, setTime] = useState("yearly");
  const [type, setType] = useState("all");

  const fetchSummary = async () => {
    const { data } = await axios.get(`/transaction/summary/${time}`);
    setSummaryData(data?.data);
  };

  const fetchIncomeDetails = async () => {
    try {
      //  loading flag on
      setTotalIncomeLoading(true);
      // fetch data
      const { data } = await axios.get("/transaction/total-income");
      setTotalIncomeDetails(data);
      setTotalIncomeLoading(false);
      setTimeout(() => {}, 2000);
    } catch (err) {
      setTotalIncomeLoading(true);
      setTotalIncomeDetails(null);
    }
  };
  const fetchExpenseDetails = async () => {
    try {
      //  loading flag on
      setTotalExpenseLoading(true);
      // fetch data
      const { data } = await axios.get("/transaction/total-expense");
      setTotalExpenseDetails(data);
      setTotalExpenseLoading(false);
    } catch (err) {
      setTotalExpenseLoading(true);
      setTotalExpenseDetails(null);
    }
  };
  const fetchSavedDetails = async () => {
    try {
      //  loading flag on
      setTotalSavedLoading(true);
      // fetch data
      const { data } = await axios.get("/transaction/total-saved");
      setTotalSavedDetails(data);
      setTotalSavedLoading(false);
    } catch (err) {
      setTotalSavedLoading(true);
      setTotalSavedDetails(null);
    }
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
    fetchIncomeDetails,
    fetchExpenseDetails,
    fetchSavedDetails,
    totalIncomeDetails,
    totalExpenseDetails,
    totalSavedDetails,
    totalExpenseLoading,
    totalIncomeLoading,
    totalSavedLoading,
    fetchCurrentMonthTransactions,
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

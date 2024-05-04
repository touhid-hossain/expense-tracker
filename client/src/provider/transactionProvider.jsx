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
  const [totalExpenseDetails, setTotalExpenseDetails] = useState(null);
  const [totalSavedDetails, setTotalSavedDetails] = useState(null);

  const [updateId, setUpdateId] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  const [updateTransactionValues, setUpdateTransactionValues] = useState("");

  const [time, setTime] = useState("yearly");
  const [type, setType] = useState("all");

  // Update transaction-list
 const editForm = (transactionId, values) => {
    setUpdateId(transactionId);
    setUpdateTransactionValues(values);
    setUpdateMode(true)
  };

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

  const fetchIncomeDetails = async () => {
    const { data } = await axios.get("/transaction/total-income");
    setTotalIncomeDetails(data);
  };
  const fetchExpenseDetails = async () => {
    console.log("expense called");
    const { data } = await axios.get("/transaction/total-expense");
    setTotalExpenseDetails(data);
  };

  const fetchSavedDetails = async () => {
    console.log("saved called");
    const { data } = await axios.get("/transaction/total-saved");
    setTotalSavedDetails(data);
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
    totalIncomeDetails,
    totalExpenseDetails,
    totalSavedDetails,
    fetchIncomeDetails,
    fetchExpenseDetails,
    fetchSavedDetails,
    fetchCurrentMonthTransactions,
    currentTotalTransactions,
    deleteTransaction,
    editForm,
    updateId,
    updateMode,
    updateTransactionValues,
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

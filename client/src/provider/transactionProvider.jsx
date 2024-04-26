import axios from "@/lib/axios";
import { useEffect } from "react";
import { createContext, useContext, useMemo, useState } from "react";

// Create Transaction Context
const TransactionContext = createContext();

// TransactionProvider Component
const TransactionProvider = ({ children }) => {
  const [transactionList, setTransactionList] = useState([]);
  // const [summaryData, setSummaryData] = useState([]);
  const [updatedTotalTransaction, setTotalTransactions] = useState(0);
  const [time, setTime] = useState("yearly");
  const [type, setType] = useState("all");

  // const getAndSetYearData = async (url) => {
  //   const { data } = await axios.get(url);
  //   setSummaryData(data?.data);
  // };

  // useEffect(() => {
  //   getAndSetYearData(`/transaction/summary/${time}`);
  //   console.log("run");
  // }, [time]);

  const handleTimeChange = (e) => {
    setTime(e);
  };

  const handleTypeChange = (type) => {
    setType(type);
  };

  // const updateTransaction = (newTransactionList) => {
  //   setTransactionList(newTransactionList);
  // }

  // // passing values in this value obj.
  // const value = useMemo(
  //   () => ({
  //     transactionList,
  //     setTransactionList: updateTransaction,
  //   })
  // );

  const value = {
    transactionList,
    setTransactionList,
    updatedTotalTransaction,
    setTotalTransactions,
    time,
    type,
    handleTimeChange,
    handleTypeChange,
    // summaryData,
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

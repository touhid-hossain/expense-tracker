const Transaction = require("../models/transactions.models");
const getMonthlyData = require("../aggregations/aggregation.monthly");
const getYearlyData = require("../aggregations/aggregation.yearly");
const {
  calculatePercentage,
  incomeCalculate,
  expenseCalculate,
  currentMonth,
  lastMonth,
} = require("../utils/income-expense-calculate");

// Function for creating a new user.
const createTransaction = async (req, res) => {
  const { name, type, category, amount } = req.body;

  try {
    const newTransaction = await Transaction.create({
      creator: req.userId,
      name,
      type,
      category,
      amount,
    });

    // Update total transactions
    updatedTotalTransactions = await Transaction.countDocuments({
      creator: req.userId,
    }).exec();
    // console.log("Updating totalTransactions in create function backend", updatedTotalTransactions);
    res.status(201).json({
      transaction: newTransaction,
      totalTransactions: updatedTotalTransactions,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Function for get transactionList depends on query.
const getAllTransaction = async (req, res) => {
  try {
    // Cast search variable to string
    let search = req.query.search || "";
    search = typeof search === "string" ? search : "";

    const page = req.query.page;
    const limit = req.query.limit;
    const skip = (page - 1) * limit;
    const type = req.query?.type;
    // find user based on queryID
    const query = {
      creator: req.userId,
    };

    if (type) {
      if (type === "all") {
        // if type === all then return all transactions
        await Transaction.find(query);
        query.name = { $regex: search, $options: "i" };
      } else {
        // search & type together
        query.name = { $regex: search, $options: "i" };
        query.type = type;
      }
    } else {
      // only search
      query.name = { $regex: search, $options: "i" };
    }
    const userTransactions = await Transaction.find(query)
      .skip(skip)
      .limit(limit);
    // Set totalTransactions
    const totalTransactions = await Transaction.countDocuments(query);
    // console.log('sending transactions value in get function',totalTransactions)
    res.status(201).json({
      transactions: userTransactions,
      totalTransactions: totalTransactions,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getMonthlyTransactionSummary = async (req, res) => {
  try {
    const userId = req.userId;
    return res
      .status(200)
      .json({ data: await getMonthlyData(userId, currentMonth) });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const getYearlyTransactionSummary = async (req, res) => {
  try {
    return res.status(200).json({ data: await getYearlyData(req.userId) });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getTotalIncome = async (req, res) => {
  try {
    const userId = req.userId;

    const currentMonthData = await getMonthlyData(userId, currentMonth);
    const lastMonthData = await getMonthlyData(userId, lastMonth);

    let currentTotalIncome = 0;
    let lastTotalIncome = 0;

    if (currentMonthData.length > 0) {
      const current_total_income = incomeCalculate(currentMonthData);
      currentTotalIncome = currentTotalIncome + current_total_income;
    }
    if (lastMonthData.length > 0) {
      const last_total_income = incomeCalculate(lastMonthData);
      lastTotalIncome += last_total_income;
    }

    return res.status(200).json({
      income: currentTotalIncome,
      percentage: calculatePercentage(lastTotalIncome, currentTotalIncome),
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getTotalExpense = async (req, res) => {
  try {
    const userId = req.userId;

    const currentMonthData = await getMonthlyData(userId, currentMonth);
    const lastMonthData = await getMonthlyData(userId, lastMonth);

    let currentTotalExpense = 0;
    let lastTotalExpense = 0;

    if (currentMonthData.length > 0) {
      const current_total_expense = expenseCalculate(currentMonthData);
      currentTotalExpense += current_total_expense;
    }
    if (lastMonthData.length > 0) {
      const last_total_expense = expenseCalculate(lastMonthData);
      lastTotalExpense += last_total_expense;
    }

    return res.status(200).json({
      expense: currentTotalExpense,
      percentage: calculatePercentage(lastTotalExpense, currentTotalExpense),
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getTotalSaved = async (req, res) => {
  try {
    const userId = req.userId;

    const currentMonthData = await getMonthlyData(userId, currentMonth);
    const lastMonthData = await getMonthlyData(userId, lastMonth);
    let currentTotalSaved = 0;
    let lastTotalSaved = 0;

    if (currentMonthData.length > 0) {
      const currentIncome = incomeCalculate(currentMonthData);
      const currentExpense = expenseCalculate(currentMonthData);
      // always Income >> Expense, ensure that from client-side
      currentTotalSaved += currentIncome - currentExpense;
    }
    if (lastMonthData.length > 0) {
      const lastIncome = incomeCalculate(lastMonthData);
      const lastExpense = expenseCalculate(lastMonthData);
      lastTotalSaved += lastIncome - lastExpense;
    }

    return res.status(200).json({
      totalSaved: currentTotalSaved,
      percentage: calculatePercentage(lastTotalSaved, currentTotalSaved),
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getCurrentMonthlyTransactionSummary = async (req, res) => {
  try {
    const monthlyData = await getMonthlyData(req.userId, currentMonth);

    const totalDailyTotalTransactions = monthlyData.reduce((acc, curr) => {
      return acc + curr.dailyTotalTransactions;
    }, 0);

    return res.status(200).json(totalDailyTotalTransactions);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createTransaction,
  getAllTransaction,
  getMonthlyTransactionSummary,
  getYearlyTransactionSummary,
  getTotalIncome,
  getTotalExpense,
  getTotalSaved,
  getCurrentMonthlyTransactionSummary,
};

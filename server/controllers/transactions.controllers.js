const Transaction = require("../models/transactions.models");
const getMonthlyData = require("../aggregations/aggregation.monthly");
const getYearlyData = require("../aggregations/aggregation.yearly");
const responseHandler = require("../utils/responseHandler");
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
      .limit(limit)
      .sort({ createdAt: -1 }) // sort by createdAt in descending order
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

    // validation ==>
    if (currentMonthData.length <= 0) {
      // some staff..
      return responseHandler({
        res,
        message: "You have not transaction in this month",
        code: 500,
      });
    }

    const currentTotalIncome = incomeCalculate(currentMonthData);

    // validation ==>
    if (lastMonthData.length <= 0) {
      // some staff..
      return responseHandler({
        res,
        message: {
          income: currentTotalIncome,
          percentage: "You didn't have any transaction in last month",
        },
        code: 200,
      });
    }

    const lastTotalIncome = incomeCalculate(lastMonthData);

    return responseHandler({
      res,
      message: {
        income: currentTotalIncome,
        percentage: calculatePercentage(lastTotalIncome, currentTotalIncome),
      },
      code: 200,
    });
  } catch (error) {
    responseHandler({
      res,
      message: error.message,
      code: 400,
    });
  }
};

const getTotalExpense = async (req, res) => {
  try {
    const userId = req.userId;

    const currentMonthData = await getMonthlyData(userId, currentMonth);
    const lastMonthData = await getMonthlyData(userId, lastMonth);

    // validation ==>
    if (currentMonthData.length <= 0) {
      // some staff..
      return responseHandler({
        res,
        message: "You have not transaction in this month",
        code: 500,
      });
    }

    const currentTotalExpense = expenseCalculate(currentMonthData);

    // validation ==>
    if (lastMonthData.length <= 0) {
      // some staff..
      return responseHandler({
        res,
        message: {
          expense: currentTotalExpense,
          percentage: "You didn't have any transaction in last month",
        },
        code: 200,
      });
    }
    const lastTotalExpense = expenseCalculate(lastMonthData);

    return responseHandler({
      res,
      message: {
        expense: currentTotalExpense,
        percentage: calculatePercentage(lastTotalExpense, currentTotalExpense),
      },
      code: 200,
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

    // validation ==>
    if (currentMonthData.length <= 0) {
      // some staff..
      return responseHandler({
        res,
        message: "You have not transaction in this month",
        code: 500,
      });
    }

    // always Income >> Expense, ensure that from client-side
    const currentTotalSaved =
      incomeCalculate(currentMonthData) - expenseCalculate(currentMonthData);

    // validation ==>
    if (lastMonthData.length <= 0) {
      // some staff..
      return responseHandler({
        res,
        message: {
          totalSaved: currentTotalSaved,
          percentage: "You didn't have any transaction in last month",
        },
        code: 200,
      });
    }

    const lastTotalSaved = incomeCalculate(lastMonthData);
    -expenseCalculate(lastMonthData);

    return responseHandler({
      res,
      message: {
        totalSaved: currentTotalSaved,
        percentage: calculatePercentage(lastTotalSaved, currentTotalSaved),
      },
      code: 200,
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

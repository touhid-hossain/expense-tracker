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
    const transactions = await Transaction.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }); // sort by createdAt in descending order
    const totalTransactions = await Transaction.countDocuments(query);

    // Set totalTransactions
    res.status(201).json({
      transactions,
      totalTransactions,
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

const getTransactionDetails = async (req, res) => {
  try {
    const userId = req.userId;

    const currentMonthData = await getMonthlyData(userId, currentMonth);
    const lastMonthData = await getMonthlyData(userId, lastMonth);

    // Last month ==>
    const lastMonthIncome = incomeCalculate(lastMonthData);
    const lastMonthExpense = expenseCalculate(lastMonthData);
    const lastMonthSaved = lastMonthIncome - lastMonthExpense;
    // Last month ==>

    // Current month ==>
    const currentMonthIncome = incomeCalculate(currentMonthData);
    const currentMonthExpense = expenseCalculate(currentMonthData);
    const currentMonthSaved = currentMonthIncome - currentMonthExpense;
    // Current month ==>

    // //  ==> Case 1
    if (currentMonthData.length <= 0 && lastMonthData.length > 0) {
      const detailsObject = {
        value: 0,
        ...calculatePercentage(lastMonthIncome, 0),
      };

      // some staff..
      return responseHandler({
        res,
        message: {
          incomeDetail: detailsObject,
          expenseDetail: detailsObject,
          savedDetail: detailsObject,
        },
        code: 200,
      });
    }

    // //  ==> Case 2
    if (currentMonthData.length > 0 && lastMonthData.length <= 0) {
      const percentage = calculatePercentage(0, null);
      // some staff..
      return responseHandler({
        res,
        message: {
          incomeDetail: {
            value: currentMonthIncome,
            ...percentage,
          },
          expenseDetail: {
            value: currentMonthExpense,
            ...percentage,
          },
          savedDetail: {
            value: currentMonthSaved,
            ...percentage,
          },
        },
        code: 200,
      });
    }

    // //  ==> Case 3
    if (currentMonthData.length <= 0 && lastMonthData.length <= 0) {
      const detailsObject = {
        value: 0,
        ...calculatePercentage(0, 0),
      };

      // some staff..
      return responseHandler({
        res,
        message: {
          incomeDetail: detailsObject,
          expenseDetail: detailsObject,
          savedDetail: detailsObject,
        },
        code: 200,
      });
    }

    // //  ==> Case 4
    if (currentMonthData.length > 0 && lastMonthData.length > 0) {
      return responseHandler({
        res,
        message: {
          incomeDetail: {
            value: currentMonthIncome,
            ...calculatePercentage(lastMonthIncome, currentMonthIncome),
          },
          expenseDetail: {
            value: currentMonthExpense,
            ...calculatePercentage(lastMonthExpense, currentMonthExpense),
          },
          savedDetail: {
            value: currentMonthSaved,
            ...calculatePercentage(lastMonthSaved, currentMonthSaved),
          },
        },
        code: 200,
      });
    }
  } catch (error) {
    responseHandler({
      res,
      message: error.message,
      code: 400,
    });
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

const editTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const updateIncomingTransactionValues = req.body;

    const updatedTransaction = await Transaction.findByIdAndUpdate(
      id,
      updateIncomingTransactionValues,
      { new: true }
    );

    if (!updatedTransaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }
    res.status(200).json({ updatedTransaction });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findByIdAndDelete(id);

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }
    res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createTransaction,
  getAllTransaction,
  getMonthlyTransactionSummary,
  getYearlyTransactionSummary,
  getTransactionDetails,
  getCurrentMonthlyTransactionSummary,
  editTransaction,
  deleteTransaction,
};

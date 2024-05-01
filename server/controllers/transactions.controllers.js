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
      .sort({ createdAt: -1 }); // sort by createdAt in descending order
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

    // //  ==> Case 1
    if (currentMonthData.length <= 0 && lastMonthData.length > 0) {
      // calculate last total
      const lastTotalIncome = incomeCalculate(lastMonthData);

      // some staff..
      return responseHandler({
        res,
        message: {
          value: 0,
          percentage: {
            ...calculatePercentage(lastTotalIncome, 0),
            isLastNone: false,
          },
        },
        code: 200,
      });
    }

    // //  ==> Case 2
    if (currentMonthData.length > 0 && lastMonthData.length <= 0) {
      // calculate current total
      const currentTotalIncome = incomeCalculate(currentMonthData);

      // some staff..
      return responseHandler({
        res,
        message: {
          value: currentTotalIncome,
          percentage: {
            ...calculatePercentage(0, currentTotalIncome),
            isLastNone: true,
          },
        },
        code: 200,
      });
    }

    // //  ==> Case 3
    if (currentMonthData.length <= 0 && lastMonthData.length <= 0) {
      // some staff..
      return responseHandler({
        res,
        message: {
          value: 0,
          percentage: {
            ...calculatePercentage(0, 0),
            isLastNone: true,
          },
        },
        code: 200,
      });
    }

    // //  ==> Case 4
    if (currentMonthData.length > 0 && lastMonthData.length > 0) {
      // calculate current total
      const currentTotalIncome = incomeCalculate(currentMonthData);
      // calculate last total
      const lastTotalIncome = incomeCalculate(lastMonthData);
      // some staff..
      return responseHandler({
        res,
        message: {
          value: currentTotalIncome,
          percentage: {
            ...calculatePercentage(lastTotalIncome, currentTotalIncome),
            isLastNone: false,
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
const getTotalExpense = async (req, res) => {
  try {
    const userId = req.userId;

    const currentMonthData = await getMonthlyData(userId, currentMonth);
    const lastMonthData = await getMonthlyData(userId, lastMonth);

    // //  ==> Case 1
    if (currentMonthData.length <= 0 && lastMonthData.length > 0) {
      // calculate last total
      const lastTotalExpense = expenseCalculate(lastMonthData);

      // some staff..
      return responseHandler({
        res,
        message: {
          value: 0,
          percentage: {
            ...calculatePercentage(lastTotalExpense, 0),
            isLastNone: false,
          },
        },
        code: 200,
      });
    }

    // //  ==> Case 2
    if (currentMonthData.length > 0 && lastMonthData.length <= 0) {
      // calculate current total
      const currentTotalExpense = expenseCalculate(currentMonthData);

      // some staff..
      return responseHandler({
        res,
        message: {
          value: currentTotalExpense,
          percentage: {
            ...calculatePercentage(0, currentTotalExpense),
            isLastNone: true,
          },
        },
        code: 200,
      });
    }

    // //  ==> Case 3
    if (currentMonthData.length <= 0 && lastMonthData.length <= 0) {
      // some staff..
      return responseHandler({
        res,
        message: {
          value: 0,
          percentage: {
            ...calculatePercentage(0, 0),
            isLastNone: true,
          },
        },
        code: 200,
      });
    }

    // //  ==> Case 4
    if (currentMonthData.length > 0 && lastMonthData.length > 0) {
      // calculate current total
      const currentTotalExpense = expenseCalculate(currentMonthData);
      // calculate last total
      const lastTotalExpense = expenseCalculate(lastMonthData);
      // some staff..
      return responseHandler({
        res,
        message: {
          value: currentTotalExpense,
          percentage: {
            ...calculatePercentage(lastTotalExpense, currentTotalExpense),
            isLastNone: false,
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
const getTotalSaved = async (req, res) => {
  try {
    const userId = req.userId;
    const currentMonthData = await getMonthlyData(userId, currentMonth);
    const lastMonthData = await getMonthlyData(userId, lastMonth);

    // //  ==> Case 1
    if (currentMonthData.length <= 0 && lastMonthData.length > 0) {
      // calculate last total
      const lastTotalSaved =
        incomeCalculate(lastMonthData) - expenseCalculate(lastMonthData);

      // some staff..
      return responseHandler({
        res,
        message: {
          value: 0,
          percentage: {
            ...calculatePercentage(lastTotalSaved, 0),
            isLastNone: false,
          },
        },
        code: 200,
      });
    }

    // //  ==> Case 2
    if (currentMonthData.length > 0 && lastMonthData.length <= 0) {
      // calculate current total saved
      const currentTotalSaved =
        incomeCalculate(currentMonthData) - expenseCalculate(currentMonthData);

      // some staff..
      return responseHandler({
        res,
        message: {
          value: currentTotalSaved,
          percentage: {
            ...calculatePercentage(0, currentTotalSaved),
            isLastNone: true,
          },
        },
        code: 200,
      });
    }

    // //  ==> Case 3
    if (currentMonthData.length <= 0 && lastMonthData.length <= 0) {
      // some staff..
      return responseHandler({
        res,
        message: {
          value: 0,
          percentage: {
            ...calculatePercentage(0, 0),
            isLastNone: true,
          },
        },
        code: 200,
      });
    }

    // //  ==> Case 4
    if (currentMonthData.length > 0 && lastMonthData.length > 0) {
      const currentTotalSaved =
        incomeCalculate(currentMonthData) - expenseCalculate(currentMonthData);
      const lastTotalSaved =
        incomeCalculate(lastMonthData) - expenseCalculate(lastMonthData);
      // some staff..
      return responseHandler({
        res,
        message: {
          value: currentTotalSaved,
          percentage: {
            ...calculatePercentage(lastTotalSaved, currentTotalSaved),
            isLastNone: false,
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

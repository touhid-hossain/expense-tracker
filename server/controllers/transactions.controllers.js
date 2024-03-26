const Transaction = require("../models/transactions.models");

// Function for creating a new user.
exports.createTransaction = async (req, res) => {
  const { name, type, category, amount } = req.body;

  try {
    const newTransaction = await Transaction.create({
      creator: req.userId,
      name,
      type,
      category,
      amount,
    });

    res.status(201).json({ transaction: newTransaction });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Function for get all transactionList.
exports.getAllTransaction = async (req, res) => {
  try {
    const page = req.query.page;
    const limit = req.query.limit || 10;
    const skip = (page - 1) * limit;
    const search = req.query.search;
    const type = req.query?.type;

    const query = {
      creator: req.userId,
      name: { $regex: search, $options: "i" },
    }

    if (type) query.type = type;

    const userTransactions = await Transaction.find(query)
    .skip(skip)
    .limit(limit);

    const totalTransactions = await Transaction.countDocuments(query);

    res.status(201).json({ transactions: userTransactions, totalTransactions });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

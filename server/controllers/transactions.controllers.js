const Transaction = require("../models/transactions.models");

// Function for creating a new user
exports.createTransaction = async (req, res) => {
  const { name,type, category, amount } = req.body;

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

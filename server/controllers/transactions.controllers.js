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

    // Update total transactions
    updatedTotalTransactions = await Transaction.countDocuments({
      creator: req.userId,
    }).exec();
    // console.log("Updatinng totalTransactions in create function backend", updatedTotalTransactions);
    res
      .status(201)
      .json({
        transaction: newTransaction,
        totalTransactions: updatedTotalTransactions,
      });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Function for get transactionList depends on query.
exports.getAllTransaction = async (req, res) => {
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
    res
      .status(201)
      .json({
        transactions: userTransactions,
        totalTransactions: totalTransactions,
      });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Function for get aggregateTransactionList depends on query.
exports.aggregateTransactionList = async (req, res) => {
  try {
    const type = req.query?.type;
    const time = req.query?.time;
    console.log("Getting type and time in backend fnc", type, time);

    console.log(res.status(201).json({ transaction: "Good, data incoming" }));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

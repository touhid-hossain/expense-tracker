const Transaction = require("../models/transactions.models");
const moment = require("moment");

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
    res.status(201).json({
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
    res.status(201).json({
      transactions: userTransactions,
      totalTransactions: totalTransactions,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Function for get aggregateTransactionList depends on query.
exports.aggregateTransactionList = async (req, res) => {
  const validTimePeriods = ["daily", "weekly", "monthly"];
  const type = req.query?.type;
  const time = req.query?.time;
  // console.log("Getting type and time in backend fnc", type, time);
  if (!validTimePeriods.includes(time)) {
    return res.status(400).json({ message: "Invalid time period" });
  }

  // Convert time variable to a valid time unit
  let unit;
  if (time === "monthly") {
    unit = "month";
  } else if (time === "weekly") {
    unit = "week";
  } else if (time === "daily") {
    unit = "day";
  }
  console.log(unit);

  const startOfTime = moment().startOf(unit);
  const endOfTime = moment().endOf(unit);
  console.log("Checking time formation", startOfTime, endOfTime);
  try {
    // Checking the CreatedAt time formation
    // const transactions = await Transaction.find({
    //   createdAt: {
    //     $gte: startOfTime,
    //     $lte: endOfTime,
    //   },
    // });

    // console.log("Checking the CreatedAt time formation: ", transactions);

    const result = await Transaction.aggregate([
      {
        $match: {
          // createdAt: {
          //   $gte: startOfTime,
          //   $lte: endOfTime,
          // },
        },
      },
      {
        $group: {
          _id: "kuchbhi"
          // _id: {
          //   $dateTrunc: {
          //     date: "$createdAt",
          //     unit: unit,
          //     binSize: 1
          //   },
          // },
          // totalIncome: {
          //   $sum: {
          //     $cond: {
          //       if: { $eq: ["$type", "Income"] },
          //       then: "$amount",
          //       else: 0,
          //     },
          //   },
          // },
          // totalExpense: {
          //   $sum: {
          //     $cond: {
          //       if: { $eq: ["$type", "Expense"] },
          //       then: "$amount",
          //       else: 0,
          //     },
          //   },
          // },
        },
      },
    ]);

    console.log("Checking the aggregate value", result);

    res.status(200).json({ aggregateValue: result });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// Function for getting transaction summary
exports.getTransactionSummary = async (req, res) => {
  // Define an empty array to store monthly data
  const monthlyData = [];

  // Function to calculate savings for a month
  const calculateSavings = (income, expense) => {
    const savings = parseFloat(income) - parseFloat(expense);
    if(savings < 1) {
      return 0;
    }else {
      return savings;
    }
  }

  try {
    // Find transactions for the user
    const transactions = await Transaction.find({ creator: req.userId });

    // Loop through each transaction
    for (const transaction of transactions) {
      // Extract month from transaction date (adjust based on your date format)
      const month = transaction.createdAt.getMonth();

      // Check if month object exists in monthlyData
      let monthObject = monthlyData.find(data => data.month === month);

      if (!monthObject) {
        // Create a new object for the month
        monthObject = {
          month,
          income: '0',
          expense: '0',
          savings: '0',
          monthName: getMonthName(month) // Add a function to get month name (optional)
        };

        // Add the new object to the monthlyData array
        monthlyData.push(monthObject);
      }

      // Update income or expense
      if(transaction.type === 'income') {
        monthObject.income = (parseFloat(monthObject.income) + parseFloat(transaction.amount)).toString();
      }
      if(transaction.type === 'expense') {
        monthObject.expense = (parseFloat(monthObject.expense) + parseFloat(transaction.amount)).toString();
      }

      // Calculate savings 
      monthObject.savings = calculateSavings(monthObject.income, monthObject.expense).toString();
    }

    

    // Return the processed monthly data
    res.status(200).json(monthlyData);
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
}

function getMonthName(month) {
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
  return monthNames[month];
}
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
exports.getTransactionSummary = async (req, res) => {
  const type = req.query?.type;
  const time = req.query?.time;
  

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

    const yearlyResult = await Transaction.aggregate([
      {
        $group: {
          _id: {
            $year: "$createdAt",
          },
          items: {
            $push: {
              type: "$type",
              year: {
                $year: "$createdAt",
              },
              amount: {
                $toInt: "$amount",
              },
              creator: "$creator",
              month: {
                $arrayElemAt: [
                  [
                    {
                      monthName: "Jan",
                      monthIndex: 0,
                    },
                    {
                      monthName: "Feb",
                      monthIndex: 1,
                    },
                    {
                      monthName: "Mar",
                      monthIndex: 2,
                    },
                    {
                      monthName: "Apr",
                      monthIndex: 3,
                    },
                    {
                      monthName: "May",
                      monthIndex: 4,
                    },
                    {
                      monthName: "Jun",
                      monthIndex: 5,
                    },
                    {
                      monthName: "Jul",
                      monthIndex: 6,
                    },
                    {
                      monthName: "Aug",
                      monthIndex: 7,
                    },
                    {
                      monthName: "Sep",
                      monthIndex: 8,
                    },
                    {
                      monthName: "Oct",
                      monthIndex: 9,
                    },
                    {
                      monthName: "Nov",
                      monthIndex: 10,
                    },
                    {
                      monthName: "Dec",
                      monthIndex: 11,
                    },
                  ],
                  {
                    $subtract: [{ $month: "$createdAt" }, 1],
                  },
                ],
              },
            },
          },
        },
      },
      {
        $match: {
          _id: new Date().getFullYear(),
        },
      },
      {
        $unwind: "$items", // Unwind the items array
      },
      {
        $group: {
          _id: "$items.month",

          // Group by month
          items: {
            $push: "$items",
          }, // Push items into an array for each month
        },
      },
      {
        $addFields: {
          results: {
            $reduce: {
              input: "$items",
              initialValue: {
                totalIncomeAmount: 0,
                totalExpenseAmount: 0,
                info: {},
              },
              in: {
                $cond: {
                  if: {
                    $eq: ["$$this.type", "income"],
                  },
                  then: {
                    $mergeObjects: [
                      "$$value",
                      {
                        info: {
                          year: "$$this.year",
                          userId: "$$this.creator",
                          currency: "BDT",
                        },
                      },
                      {
                        totalIncomeAmount: {
                          $add: ["$$value.totalIncomeAmount", "$$this.amount"],
                        },
                      },
                    ],
                  },
                  else: {
                    $mergeObjects: [
                      "$$value",
                      {
                        info: {
                          year: "$$this.year",
                          userId: "$$this.creator",
                          currency: "BDT",
                        },
                      },
                      {
                        totalExpenseAmount: {
                          $add: ["$$value.totalExpenseAmount", "$$this.amount"],
                        },
                      },
                    ],
                  },
                },
              },
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          monthName: "$_id.monthName",
          monthIndex: "$_id.monthIndex",
          results: 1,
        },
      },
      {
        $sort: {
          monthIndex: 1,
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [
              {
                month: "$monthName",
              },
              "$results",
            ],
          },
        },
      },
    ]);

    console.log("checking aggregate result", yearlyResult);

    if (time === "year") {
      return res.status(200).json({ aggregateValue: yearlyResult });
    } else {
      console.log("Time Doest match");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



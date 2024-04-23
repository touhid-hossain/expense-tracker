const Transaction = require("../models/transactions.models");
const { monthArr } = require("./aggregation.utils");

const currentMonth = monthArr[new Date().getMonth()].monthName;
const info = {
  year: "$$this.year",
  userId: "$$this.creator",
  day: "$$this.day",
};

module.exports = async () => {
  const [{ items: data }] = await Transaction.aggregate([
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
            day: {
              $dayOfMonth: "$createdAt",
            },
            amount: {
              $toInt: "$amount",
            },
            month: {
              $arrayElemAt: [
                monthArr,
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
        _id: {
          month: "$items.month.monthName",
          day: "$items.day",
        },

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
              income: 0,
              expense: 0,
              currency: "BDT",
            },
            in: {
              $cond: {
                if: {
                  $eq: ["$$this.type", "income"],
                },
                then: {
                  $mergeObjects: [
                    "$$value",
                    info,
                    {
                      income: {
                        $add: ["$$value.income", "$$this.amount"],
                      },
                    },
                  ],
                },
                else: {
                  $mergeObjects: [
                    "$$value",
                    info,
                    {
                      expense: {
                        $add: ["$$value.expense", "$$this.amount"],
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
      $group: {
        _id: "$_id.month",
        items: { $push: "$results" },
      },
    },
    {
      $match: {
        _id: currentMonth,
      },
    },

    {
      $project: {
        _id: 0,
        month: "$_id",
        items: 1,
      },
    },
  ]);
  // sort this data
  data.sort((a, b) => a.day - b.day);
  return data;
};

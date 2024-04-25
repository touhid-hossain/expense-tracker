const Transaction = require("../models/transactions.models");
const {
  groupByYear,
  matchCurrentYear,
  unwindItemsArr,
  matchUser,
} = require("./aggregation.utils");

module.exports = async (userId) => {
  return await Transaction.aggregate([
    matchUser(userId),
    groupByYear,
    matchCurrentYear,
    unwindItemsArr,
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
              income: 0,
              expense: 0,
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
                      income: {
                        $add: ["$$value.income", "$$this.amount"],
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
};

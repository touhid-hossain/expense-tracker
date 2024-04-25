const Transaction = require("../models/transactions.models");
const {
  monthArr,
  groupByYear,
  matchCurrentYear,
  unwindItemsArr,
  matchUser,
} = require("./aggregation.utils");
// mongoose.Types.ObjectId(user_id)

const currentMonth = monthArr[new Date().getMonth()].monthName;

module.exports = async (userId) => {
  const [{ items }] = await Transaction.aggregate([
    matchUser(userId),
    groupByYear,
    matchCurrentYear,
    unwindItemsArr,

    {
      $group: {
        _id: {
          month: "$items.month.monthName",
          day: "$items.day",
        },
        items: {
          $push: {
            type: "$items.type",
            amount: "$items.amount",
            day: "$items.day",
            month: "$items.month.monthName",
            // year: 2024,
            // creator: "65f61d912b25fc2f294080d7",
            // month: {
            //   "monthName": "Mar",
            //   "monthIndex": 2
            // }
          },
        },
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
              dailyTotalTransactions: 0,
              day: null,
              month: null,
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
                      dailyTotalTransactions: {
                        $add: ["$$value.dailyTotalTransactions", 1],
                      },
                      day: "$$this.day",
                      month: "$$this.month",
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
                      dailyTotalTransactions: {
                        $add: ["$$value.dailyTotalTransactions", 1],
                      },
                      day: "$$this.day",
                      month: "$$this.month",
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
        items: 1,
      },
    },
  ]);
  // sort this data
  items.sort((a, b) => a.day - b.day);
  return items;
};

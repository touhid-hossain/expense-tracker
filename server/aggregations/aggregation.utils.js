const mongoose = require("mongoose");
const monthArr = [
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
];

const matchUser = (userId) => {
  return {
    $match: {
      creator: new mongoose.Types.ObjectId(userId),
    },
  };
};

const groupByYear = {
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
        day: {
          $dayOfMonth: "$createdAt",
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
};

const matchCurrentYear = {
  $match: {
    _id: new Date().getFullYear(),
  },
};
const unwindItemsArr = {
  $unwind: "$items",
};

module.exports = {
  groupByYear,
  monthArr,
  matchCurrentYear,
  unwindItemsArr,
  matchUser,
};

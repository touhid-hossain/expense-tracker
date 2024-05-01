const { monthArr } = require("../aggregations/aggregation.utils");

function incomeCalculate(arr) {
  return arr.reduce((total, curr) => {
    return total + curr.income;
  }, 0);
}
function expenseCalculate(arr) {
  return arr.reduce((total, curr) => {
    return total + curr.expense;
  }, 0);
}
function calculatePercentage(last, current) {
  // Check for invalid input (non-numeric values)
  if (isNaN(last) || isNaN(current)) {
    throw new Error("Inputs must be numbers");
  }
  if (last === 0) {
    return {
      value: "Last Month Have not any value",
      increase: false,
    };
  }

  if (current > last) {
    const diff = current - last;
    const percentage = (diff / last) * 100;
    // Round the percentage to two decimal places (optional)
    const roundedPercentage = Math.round(percentage * 100) / 100;
    return {
      value: roundedPercentage,
      increase: true,
    };
  } else {
    const diff = last - current;

    const percentage = (diff / last) * 100;
    // Round the percentage to two decimal places (optional)
    const roundedPercentage = Math.round(percentage * 100) / 100;
    return {
      value: roundedPercentage,
      increase: false,
    };
  }
}

const currentMonth = monthArr[new Date().getMonth()].monthName;
const lastMonth = monthArr[new Date().getMonth() - 1].monthName;

module.exports = {
  currentMonth,
  lastMonth,
  incomeCalculate,
  expenseCalculate,
  calculatePercentage,
};

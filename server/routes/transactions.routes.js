const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/authMiddleware");
const {
  createTransaction,
  getAllTransaction,
  getYearlyTransactionSummary,
  getMonthlyTransactionSummary,
  getTotalIncome,
  getTotalExpense,
  getTotalSaved,
  getCurrentMonthlyTransactionSummary,
} = require("../controllers/transactions.controllers");

// Route for creating a new transaction
router.post("/", verifyToken, createTransaction);

//Route for get all transaction List by user id and search keywords category and pagination
router.get("/", verifyToken, getAllTransaction);
//Route for for get aggregateTransactionList depends on query.

router.get("/summary", getYearlyTransactionSummary);

router.get("/summary/yearly", verifyToken, getYearlyTransactionSummary);
router.get("/summary/monthly", verifyToken, getMonthlyTransactionSummary);
router.get(
  "/currentMonth/transactions",
  verifyToken,
  getCurrentMonthlyTransactionSummary
);

router.get("/total-income", verifyToken, getTotalIncome);
router.get("/total-expense", verifyToken, getTotalExpense);
router.get("/total-saved", verifyToken, getTotalSaved);

module.exports = router;

const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/authMiddleware");
const {
  createTransaction,
  getAllTransaction,
  getYearlyTransactionSummary,
  getMonthlyTransactionSummary,
  getCurrentMonthlyTransactionSummary,
  deleteTransaction,
  editTransaction,
  getCurrentTransactionDetails,
  getTotalTransactionDetails,
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

router.get("/current-details", verifyToken, getCurrentTransactionDetails);
router.get("/total-details", verifyToken, getTotalTransactionDetails);
router.put("/edit-transaction/:id", editTransaction);
router.delete("/delete-transaction/:id", deleteTransaction);

module.exports = router;

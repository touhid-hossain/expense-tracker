const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transactions.controllers");
const { verifyToken } = require("../middlewares/authMiddleware");

// Route for creating a new transaction
router.post("/", verifyToken, transactionController.createTransaction);

//Route for get all transaction List by user id and search keywords category and pagination
router.get('/', verifyToken, transactionController.getAllTransaction)

 
module.exports = router;

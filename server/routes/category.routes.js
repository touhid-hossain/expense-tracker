const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category.controllers");



// Get new category
router.get('/', categoryController.getAllCategory )

// Route for creating a new transaction
router.post("/create", categoryController.createCategory);

// router.delete("/:id", categoryController.createCategory);



module.exports = router;


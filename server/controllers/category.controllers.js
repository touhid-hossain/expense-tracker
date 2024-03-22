const Category = require("../models/category.models");

// Function for creating a new user
exports.createCategory = async (req, res) => {
  const { name, type } = req.body;

  if (!name || !type) {
    return res.status(400).json({ message: "Name or Type is missing" });
  }

  try {
    const newCategory = await Category.create({
      name,
      type,
    });

    res
      .status(201)
      .json({
        category: newCategory,
        message: "Successfully Created New Category",
      });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllCategory = async (req, res) => {
  try {
    const type = req.query.type.toLowerCase();
    // If type is not provided, return all categories
    if (!type) {
      return res.status(400).json({ message: "Invalid type" });
    }

    if (type === "income" || type === "expense") {
      const filteredCategory = await Category.find({ type });

      res.status(200).json({ categories: filteredCategory });
    } else {
      res.status(400).json({ message: "Invalid type" });
    }
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

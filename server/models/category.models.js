const mongoose = require("mongoose");
const { Schema } = mongoose; // Import Schema object from mongoose

const CategorySchema = new Schema({
  name: { type: String, required: true, trim: true },
  type: { enum: ["income", "expense"], type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
});

module.exports = mongoose.model("category", CategorySchema);

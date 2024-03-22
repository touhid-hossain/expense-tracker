const mongoose = require("mongoose");
const { Schema } = mongoose; // Import Schema object from mongoose

const TransactionsSchema = new Schema({
  creator: { type: Schema.Types.ObjectId, ref: "user" },
  name: { type: String, required: true, trim: true },
  type: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, required: true, ref: 'category' },
  amount: { type: String },
  createdAt: { type: Date, required: true, default: Date.now },
});

module.exports = mongoose.model("transactions", TransactionsSchema);



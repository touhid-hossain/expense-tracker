// imports
const cors = require("cors");
const express = require("express");
const env = require("dotenv");
const connectDB = require("./connection/connectionDB.js");
const userRoutes = require("./routes/user.routes.js");
const transactionRoutes = require("./routes/transactions.routes.js");
const categoryRoutes = require("./routes/category.routes.js");
const path = require("path");

env.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Cors options
const corsOptions = {
  origin: [
    "https://expense-tracker-zdu4.vercel.app/",
    "http://localhost:5173/",
  ],
};

/* Set Middle wares  */
app.use(express.json());
app.use(cors(corsOptions));

// database connect
connectDB();

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Application Level  Middleware pattern
app.use("/api/v1/user", userRoutes);
// Transaction middleware pattern
app.use("/api/v1/transaction", transactionRoutes);
// Category middleware pattern
app.use("/api/v1/category", categoryRoutes);

app.get("/", (req, res) => {
  res.send("Express on Vercel");
});

// Server Start
app.listen(PORT, () => {
  console.log(`server is running http://localhost:${PORT}`);
});

// Error Handling
app.use((err, req, res, next) => {
  if (err) {
    res.status(err.status).json({ message: "Something went wrong!!" });
  }
  console.log(err);
});

// Export app object
module.exports = app;

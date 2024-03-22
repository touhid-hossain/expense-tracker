// imports
const cors = require("cors");
const express = require("express");
const env = require("dotenv");
const connectDB = require("./connection/connectionDB.js");
const userRoutes = require("./routes/user.routes.js")
const transactionRoutes = require("./routes/transactions.routes.js")
const categoryRoutes = require("./routes/category.routes.js")


env.config();
const app = express();
const PORT = process.env.PORT || 5000;

/* Set Middle wares  */
app.use(cors());
app.use(express.json());

// database connect
connectDB();

// Application Level  Middleware pattern
app.use("/api/v1/user", userRoutes);
// Transaction middleware pattern
app.use("/api/v1/transaction", transactionRoutes);
// Category middleware pattern
app.use('/api/v1/category', categoryRoutes)

app.use("/uploads", express.static("uploads/"));

// Server Start
app.listen(PORT, () => {
  console.log(`server is running http://localhost:${PORT}`);
});

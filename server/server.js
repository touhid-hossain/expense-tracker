// imports
const cors = require("cors");
const express = require("express");
const env = require("dotenv");
const connectDB = require("./connection/connectionDB.js");

const dashboardRoutes = require("./routes/dashboard.routes");

env.config();
const app = express();
const PORT = process.env.PORT || 5000;

/* Set Middle wares  */
app.use(cors());
app.use(express.json());

// database connect
connectDB();

// Application Level  Middleware pattern
app.use("/api/v1/user", require("./routes/user.routes.js"));
app.use("/api/v1/dashboard", dashboardRoutes);

// Server Start
app.listen(PORT, () => {
  console.log(`server is running http://localhost:${PORT}`);
});

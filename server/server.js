const express = require("express");
const app = express();
const PORT = 5000;

// Built in Middleware
app.use(express.urlencoded({ extended: true }));

// Application Level  Middleware pattern
// app.use("/api/v1/expense", userRouter);

// Error Handeling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Server Start
app.listen(PORT, () => {
  console.log(`server is running http://localhost:${PORT}`);
});

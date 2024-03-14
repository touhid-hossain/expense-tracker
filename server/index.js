const express = require("express");
const userRouter = require("./routes/userRoute");
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));

app.use(userRouter);

app.listen(PORT, () => {
  console.log(`server is running http://localhost:${PORT}`);
});

const express = require("express");
const userRouter = require("./routes/user-routes");
const app = express();

app.use(express.json());

app.use("/api/v1/users", userRouter);
app.all("*", (req, res, next) => {
  const err = new AppError(`http://localhost:3000${req.url} not found`, 404);
  next(err);
});

module.exports = app;

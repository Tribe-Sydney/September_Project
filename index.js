const express = require("express");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const ErrorHandler = require("./controllers/error-controllers");
const userRouter = require("./routes/user-routes");
const productRouter = require("./routes/product-routes");
const cartRouter = require("./routes/cart-routes");
const orderRouter = require("./routes/order-routes");
const ErrorObject = require("./utils/error");
const app = express();

app.use(express.json());
app.use(cors());

let accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), {
  flags: "a",
});

// setup the logger
app.use(morgan("combined", { stream: accessLogStream }));

app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/carts", cartRouter);
app.use("/api/v1/orders", orderRouter);
app.all("*", (req, res, next) => {
  const err = new ErrorObject(`http://localhost:3000${req.url} not found`, 404);
  next(err);
});

app.use(ErrorHandler);

module.exports = app;

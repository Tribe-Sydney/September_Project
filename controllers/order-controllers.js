const Order = require("../models/Order");
const CatchAsync = require("../utils/catch-async");

exports.getOrder = CatchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (req.user.id !== order.userId.toString()) {
    return next(new ErrorObject(`You are not authorized!!!!!!!`, 403));
  }

  res.status(200).json({
    status: "success",
    data: order,
  });
});

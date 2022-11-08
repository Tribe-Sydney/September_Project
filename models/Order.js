const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    required: [true, "order must have userId"],
    ref: "User",
  },
  cartId: [
    {
      type: mongoose.Schema.ObjectId,
      required: [true, "cart id is required"],
      ref: "Cart",
    },
  ],
  totalAmount: {
    type: Number,
  },
});

orderSchema.pre(/^find/, function (next) {
  this.populate({
    path: "cartId",
    select: "name quantity amount",
  });
  next();
});
const Order = mongoose.model("Order", orderSchema);

module.exports = Order;

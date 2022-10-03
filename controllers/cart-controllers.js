const Cart = require("../models/Cart");
const Order = require("../models/Order");
const Product = require("../models/Product");
const catchAsync = require("../utils/catch-async");
const ErrorObject = require("../utils/error");
const QueryMethod = require("../utils/query");

//Create Order
exports.createCart = catchAsync(async (req, res, next) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id;

  const prod = await Product.findById(productId);
  unitPrice = prod.amount;

  if (!prod.available) {
    return next(
      new ErrorObject(`The product ${prod.name} is not available`, 400)
    );
  }

  if (prod.quantity < quantity) {
    return next(
      new ErrorObject(
        `The product ${prod.name} has ${prod.quantity} available`,
        400
      )
    );
  }

  amount = quantity * unitPrice;

  const cart = await Cart.create({
    userId,
    productId,
    quantity,
    unitPrice,
    amount,
  });
  const myOrder = await Order.findOne({ userId: req.user.id });
  console.log(myOrder);
  if (!myOrder) {
    await Order.create({
      userId: req.user.id,
      cartId: [cart.id],
      totalAmount: amount,
    });
  } else {
    console.log(myOrder.cartId);
    let cart_Id = [myOrder.cartId, cart.id];
    let totalAmount = myOrder.totalAmount + amount;
    const update = {
      totalAmount,
      cartId: cart_Id,
    };
    // console.log(update);
    // { $set: { name: 'jason bourne' }
    const order = await Order.findOneAndUpdate(
      { userId: req.user.id },
      { $set: update },
      { new: true }
    );
    console.log(order);
  }

  //   There is nothing in the order
  // There is something in the order but not the same as the new one

  res.status(200).json({
    status: "success",
    data: { cart },
  });
});

//Get all Carts
exports.getAllCarts = catchAsync(async (req, res, next) => {
  let queriedCarts = new QueryMethod(Cart.find(), req.query)
    .sort()
    .filter()
    .limit()
    .paginate();
  let cart = await queriedCarts.query;
  res.status(200).json({
    status: "success",
    results: cart.length,
    data: cart,
  });
});

//Get an Cart
exports.getOneCart = catchAsync(async (req, res, next) => {
  const cart = await Cart.findById(req.params.id);

  if (req.user.id !== cart.userId.toString()) {
    return next(new ErrorObject(`You are not authorized!!!!!!!`, 403));
  }

  if (!cart) {
    return next(
      new ErrorObject(`There is no cart with the id ${req.params.id}`, 400)
    );
  }

  res.status(200).json({
    status: "success",
    data: cart,
  });
});

//Update Cart
exports.updateCart = catchAsync(async (req, res, next) => {
  const cart = await Cart.findById(req.params.id);

  if (req.user.id !== cart.userId.toString()) {
    return next(new ErrorObject(`You are not authorized!!!!!!!`, 403));
  }
  if (!cart) {
    return next(
      new ErrorObject(`There is no cart with Id ${req.params.id}`, 400)
    );
  }
  const quantity = req.body.quantity;

  const prod = await Product.findById(cart.productId);
  if (prod.quantity < quantity) {
    return next(
      new ErrorObject(
        `The product ${prod.name} has ${prod.quantity} available`,
        400
      )
    );
  }

  amount = quantity * prod.amount;

  const update = { amount, quantity };

  const updatedCart = await Cart.findByIdAndUpdate(
    req.params.id,
    { $set: update },
    {
      new: true,
    }
  );

  res.status(200).json({
    status: "success",
    data: { updatedCart },
  });
});

//Delete an Cart
exports.deleteCart = catchAsync(async (req, res, next) => {
  const cart = await Cart.findById(req.params.id);
  if (!cart) {
    return next(
      new ErrorObject(`There is no cart with Id ${req.params.id}`, 400)
    );
  }

  await Cart.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: "success",
    status: "cart deleted successfully",
  });
});

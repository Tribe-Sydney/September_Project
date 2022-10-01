const Product = require("../models/Product");
const CatchAsync = require("../utils/catch-async");
const ErrorObject = require("../utils/error");

// creating praoducts
exports.createProduct = CatchAsync(async (req, res, next) => {
  const { name, title, quantity, available, amount, image } = req.body;
  const product = await Product.create({
    name,
    title,
    quantity,
    available,
    amount,
    image,
  });
  res.status(201).json({
    status: "success",
    data: { product },
  });
});

// updating products (either part or all aspect of the product)
exports.updateProduct = CatchAsync(async (req, res, next) => {
  const product = await product.findById(req.params.id);
  if (!product) {
    return next(
      new ErrorObject(`There is no product with the is ${req.params.id}`, 400)
    );
  }
  const name = req.body.name === undefined ? product.name : req.body.name;
  const title = req.body.title === undefined ? product.title : req.body.title;
  const amount =
    req.body.amount === undefined ? product.amount : req.body.amount;
  const quantity =
    req.body.quantity === undefined ? product.quntity : req.body.quantity;
  const image = req.body.image === undefined ? product.image : req.body.image;
  const available =
    req.body.available === undefined ? product.available : req.body.availaible;
  const update = { name, title, amount, quantity, image, available };
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    update,
    { new: true, runValidators: true }
  );
  res.status(200).json({
    status: "updated",
    data: { updatedProduct },
  });
});

// get all products
exports.getAllProduct = CatchAsync(async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json({
    status: "success",
    results: products.length,
    data: { products },
  });
});

// get one product
exports.getOneProduct = CatchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(
      new ErrorObject(`There is no product with the id ${req.params.id}`, 400)
    );
  }
  res.status(200).json({
    status: "success",
    data: {
      product,
    },
  });
});

exports.deleteProduct = CatchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(
      new ErrorObject(`There is no product with the id ${req.params.id}`, 400)
    );
  }
  await product.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: "success",
  });
});

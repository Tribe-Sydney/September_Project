const Product = require("../models/Product");

// creating praoducts
exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({
      status: "success",
      data: { product },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};

// updating products (either part or all aspect of the product)
exports.updateProduct = async (req, res) => {
  try {
    const product = await product.findById(req.params.id);
    if (!product) {
      return res.status(400).json({
        status: "fail",
        meassage: `There is no product with the is ${req.params.id}`,
      });
    }
    const name = req.body.name === undefined ? product.name : req.body.name;
    const title = req.body.title === undefined ? product.title : req.body.title;
    const amount =
      req.body.amount === undefined ? product.amount : req.body.amount;
    const quantity =
      req.body.quantity === undefined ? product.quntity : req.body.quantity;
    const image = req.body.image === undefined ? product.image : req.body.image;
    const available =
      req.body.available === undefined
        ? product.available
        : req.body.availaible;
    const update = { name, title, amount, quantity, image, available };
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      update,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      status: "updated",
      data: { updatedProduct },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};

// get all products
exports.getAllProduct = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      status: "success",
      results: products.length,
      data: { products },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      meassage: error,
    });
  }
};

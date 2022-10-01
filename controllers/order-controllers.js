const Order = require("../models/Order");

exports.createOrder = async (req, res) => {
  try {
    // NO AUTHORIZATION YET
    const { userId, product } = req.body;
    const order = await Order.create({ userId, product });

    res.status(200).json({
      status: "success",
      data: { order },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const order = await Order.find();
    res.status(200).json({
      results: order.length,
      data: order,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getOneOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    res.status(200).json({
      data: order,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(400).json({
        status: "fail",
        message: `There is no Order with Id ${req.params.id}`,
      });
    }

    const userId = (req.body.userId = order.userId);
    const product = [
      {
        productId:
          req.body.product[0].productId === undefined
            ? order.product[0].productId
            : req.body.product[0].productId,
        quantity:
          req.body.product[0].quantity === undefined
            ? order.product[0].productId
            : req.body.product[0].quantity,
        amount:
          req.body.product[0].amount === undefined
            ? order.product[0].amount
            : req.body.product[0].amount,
      },
    ];

    const update = { userId, product };

    const updatedUser = await Order.findByIdAndUpdate(req.params.id, update, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      data: { updatedUser },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(400).json({
        status: "fail",
        message: `There is no Order with Id ${req.params.id}`,
      });
    }

    await Order.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "Order deleted successfully",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

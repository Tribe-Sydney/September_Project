const express = require("express");
const { protect, restrictTo } = require("../controllers/auth-controller");
const {
  getAllOrders,
  createOrder,
  updateOrder,
  deleteOrder,
  getOneOrder,
} = require("../controllers/order-controllers");

const router = express.Router();

router.post("/", protect, createOrder);

router.get("/", protect, restrictTo('admin'), getAllOrders); //admin

router.get("/:id", protect, getOneOrder); //login
router.patch("/:id", protect, updateOrder);
router.delete("/:id", protect, deleteOrder);

module.exports = router;

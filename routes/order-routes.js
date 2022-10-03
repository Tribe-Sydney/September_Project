const express = require("express");
const { protect, restrictTo } = require("../controllers/auth-controller");
const {
  getAllCarts,
  createCart,
  updateCart,
  deleteCart,
  getOneCart,
} = require("../controllers/cart-controllers");

const router = express.Router();

router.post("/", protect, createCart);

router.get("/", protect, restrictTo("admin"), getAllCarts); //admin

router.get("/:id", protect, getOneCart); //login
router.patch("/:id", protect, updateCart);
router.delete("/:id", protect, deleteCart);

module.exports = router;

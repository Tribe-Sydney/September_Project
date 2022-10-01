const express = require("express");
const { protect, restrictTo } = require("../controllers/auth-controller");
const {
  getAllProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getOneProduct,
} = require("../controllers/product-controllers");
const router = express.Router();

router
  .route("/")
  .post(protect, restrictTo(admin), createProduct)
  .get(getAllProduct);
router
  .route("/:id")
  .delete(protect, restrictTo(admin), deleteProduct)
  .patch(protect, restrictTo(admin), updateProduct)
  .get(getOneProduct);

module.exports = router;

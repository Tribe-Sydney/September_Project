const express = require("express");
const {
  signUp,
  signIn,
  forgotPassword,
  resetPassword,
  updatePassword,
  protect,
  restrictTo,
} = require("../controllers/auth-controller");
const {
  deleteUser,
  updateUser,
  getOneUser,
  getAllUser,
} = require("../controllers/user-controllers");
const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/", protect, getAllUser);
router
  .route("/:id")
  .delete(protect, deleteUser)
  .patch(protect, updateUser)
  .get(protect, getOneUser);
router.post("/forgot-password", forgotPassword);
router.patch("/reset-password/:token", resetPassword);
router.patch("/update-password/:id", protect, updatePassword);

module.exports = router;

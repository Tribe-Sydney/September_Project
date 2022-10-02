const express = require("express");
const {
  signUp,
  signIn,
  forgotPassword,
  resetPassword,
  updatePassword,
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
router.get("/", getAllUser);
router.route("/:id").delete(deleteUser).patch(updateUser).get(getOneUser);
router.post("/forgot-password", forgotPassword);
router.patch("/reset-password/:token", resetPassword);
router.patch("/update-password", protect, updatePassword);

module.exports = router;

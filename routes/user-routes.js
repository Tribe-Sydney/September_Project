const express = require("express");
const {
  signUp,
  signIn,
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

module.exports = router;

const { default: mongoose } = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSChema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "A user must have a name"],
  },
  email: {
    type: String, // seun
    required: [true, "A user must have an email"],
    unique: true,
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "A user must have an password"],
    select: false,
    minLength: [8, "Password must ba at least 8 characters"],
    validate: {
      validator: function (val) {
        return /^(?=.*[A-Z])(?=.*[a-z])(?=.*[\d])[A-Za-z\d]{8,}/.test(val);
      },
      message:
        "Password must contain at least a number, a lowercase and an uppercase alphabeth",
    },
  },
  passwordConfirm: {
    type: String,
    required: [true, "A user must have an passwordConfirm"],
    validate: {
      validator: function (val) {
        return val === this.password;
      },
      message: "Password and confirm password are different",
    },
  },
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin"],
  },
});

userSChema.pre("save", async function (next) {
  // if (!this.isModified('password')) return next();

  let salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  this.passwordConfirm = undefined;
  next();
});

const User = mongoose.model("User", userSChema);

module.exports = User;

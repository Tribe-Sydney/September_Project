const jwt = require("jsonwebtoken");
const User = require("../models/User");
const CatchAsync = require("../utils/catch-async");
const ErrorObject = require("../utils/error");

const { JWT_COOKIE_EXPIRES_IN, JWT_EXPIRES_IN, JWT_SECRET, NODE_ENV } =
  process.env;

const signToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
};

const createAndSendToken = CatchAsync(async (user, statusCode, res) => {
  const token = await signToken(user._id);
  const cookieOptions = {
    expires: new Date(Date.now() + JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };
  if (NODE_ENV === "production") cookieOptions.secure = true;
  res.cookie("jwt", token, cookieOptions);

  user.password = undefined;
  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
});

exports.signUp = CatchAsync(async (req, res) => {
  const { email, fullName, password, passwordConfirm } = req.body;
  const user = await User.create({
    email,
    fullName,
    password,
    passwordConfirm,
  });

  createAndSendToken(user, 201, res);
});

//User login handler
exports.signIn = CatchAsync(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorObject("Please enter your email and password", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  const confirmPassword = await bcrypt.compare(password, user.password);
  if (!confirmPassword || !user) {
    return next(new ErrorObject("Invalid email or password", 401));
  }

  createAndSendToken(user, 200, res);
});

exports.protect = CatchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(new ErrorObject("You are not logged in. Kindly log in.", 401));
  }

  const decodedToken = await jwt.verify(token, JWT_SECRET);

  const currentUser = await User.findById(decodedToken.id);

  req.user = currentUser;
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.roles)) {
      return next(
        new ErrorObject("You are not authorised to perform this action.", 403)
      );
    }
    next();
  };
};

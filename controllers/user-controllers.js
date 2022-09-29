const User = require("../models/User.js");
const CatchAsync = require("../utils/catch-async.js");

//User signup handler
exports.signUp = CatchAsync(async (req, res) => {
  const { email, fullName, password, passwordConfirm } = req.body;
  const user = await User.create({
    email,
    fullName,
    password,
    passwordConfirm,
  });

  res.status(201).json({
    status: "success",
    data: {
      user,
    },
  });
});

//User login handler
exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        status: "fail",
        message: "Please enter a valid password and email",
      });
    }
    const user = await User.findOne({ email }).select("+password");
    const confirmPassword = await bcrypt.compare(password, user.password);
    if (!confirmPassword || !user) {
      return res.status(401).json({
        status: "fail",
        message: "Invalid email or password",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(400).json({
        status: "fail",
        message: `There is no user with the id ${req.params.id}`,
      });
    }
    await User.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "successful deleted",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(400).json({
        status: "fail",
        message: `There is no user with the id ${req.params.id}`,
      });
    }
    const email = req.body.email === undefined ? user.email : req.body.email;
    const fullName =
      req.body.fullName === undefined ? user.fullName : req.body.fullName;

    const updatedUser = await User.findByIdAndUpdate(req.params.id, update, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        updatedUser,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};

//Get All Users
exports.getAllUser = async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json({
      results: user.length,
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};

//Get One User
exports.getOneUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};

const express = require("express");
const User = require("./models/User");
const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
  try {
    console.log(req.body);
    const user = await User.create(req.body);
    res.status(201).json({
      user,
    });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
});

module.exports = app;

const express = require("express");
const User = require("./models/User");
const app = express();

app.use(express.json());

module.exports = app;

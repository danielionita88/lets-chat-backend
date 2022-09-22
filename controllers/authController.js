const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.register = asyncHandler(async (req, res, next) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const newUser = new User({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: hashedPassword,
  });

  const user = await newUser.save();
  const { password, ...others } = user._doc;
  res.status(201).json(others);
});

exports.login = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!user) {
    res.status(404);
    throw new Error("User not found!");
  }
  if (!validPassword) {
    res.status(400);
    throw new Error("Wrong Password!");
  }

  const { password, ...others } = user._doc;

  res.status(200).json(others);
});

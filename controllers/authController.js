const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

exports.register = asyncHandler(async (req, res, next) => {
  const { first_name, last_name, email, password } = req.body;

  if (!first_name || !last_name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields!");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    first_name,
    last_name,
    email,
    password: hashedPassword,
  });

  const { password: userPassword, ...others } = newUser._doc;

  if (newUser) {
    res.status(201).json({token: generateToken(newUser._id),...others});
  } else {
    res.status(400);
    throw new Error("Invalid user data!");
  }
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

  res.status(200).json({token: generateToken(user._id),...others});
});

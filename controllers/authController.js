// middleware for handling exceptions inside of async
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { deletePicture } = require("./s3Controller");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

exports.registerUser = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
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
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

  const { password: userPassword, ...others } = newUser._doc;

  if (newUser) {
    res.status(201).json({ token: generateToken(newUser._id), ...others });
  } else {
    res.status(400);
    throw new Error("Invalid user data!");
  }
});

exports.loginUser = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    res.status(404);
    throw new Error("User or password not valid!");
  }
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    res.status(400);
    throw new Error("User of password not valid!");
  }

  const { password, ...others } = user._doc;

  res.status(200).json({ token: generateToken(user._id), ...others });
});

exports.updateUser = asyncHandler(async (req, res) => {
  if (req.user.id === req.params.id) {
    if (Object.keys(req.body).length <= 1) {
      res.status(400);
      throw new Error("You must add at least one value!");
    }
    if (req.body.profilePicture) {
      const pictureName = req.user.profilePicture.slice(
        req.user.profilePicture.length - 32
      );
      deletePicture(pictureName);
    }
    await User.findByIdAndUpdate(req.user.id, {
      $set: req.body,
    });
    const updatedUser = await User.findById(req.user.id);
    const { password, ...others } = updatedUser._doc;
    res.status(200).json({ token: generateToken(req.user.id), ...others });
  } else {
    res.status(403).json("Access denied!");
  }
});

exports.deleteUser = asyncHandler(async (req, res) => {
  if (req.user.id === req.params.id) {
    await User.findByIdAndDelete(req.user.id);
    res.status(200).json("Account deleted succesfully!");
  } else {
    res.status(403).json("You can delete only your account");
  }
});

exports.getUsers = asyncHandler(async (req, res) => {console.log(req.query)
  const { search, limit } = req.query;

  const users = await User.find({
    $or: [
      { firstName: { $regex: search, $options: "$i" } },
      { lastName: { $regex: search, $options: "$i" } },
    ],
  }).limit(limit)

  res.status(200).json(users);
});

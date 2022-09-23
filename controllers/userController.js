const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

exports.updateUser = asyncHandler(async (req, res) => {
  if (req.user.id === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    await User.findByIdAndUpdate(req.user.id, { $set: req.body });
    res.status(200).json("Account updated succesfully!");
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



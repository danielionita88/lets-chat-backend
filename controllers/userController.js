const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.updateUser = asyncHandler(async (req, res) => {
  if (req.body.user_id === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    await User.findByIdAndUpdate(req.body.user_id, { $set: req.body });
    res.status(200).json("Account updated succesfully!");
  } else {
    res.status(403).json("Access denied!");
  }
});

exports.deleteUser = asyncHandler(async (req, res) => {
  if (req.body.user_id === req.params.id) {
    await User.findByIdAndDelete(req.body.user_id);
    res.status(200).json("Account deleted succesfully!");
  } else {
    req.status(403).json("You can delete only your account");
  }
});

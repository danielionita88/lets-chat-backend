const asyncHandler = require("express-async-handler");
const FriendRequest = require("../models/friendRequestModel");
const User = require("../models/userModel");

exports.getFriendRequests = asyncHandler(async (req, res) => {
  const friendRequests = await FriendRequest.find({
    requested: req.params.userId,
  }).populate("requester", "_id firstName lastName profilePicture");
  res.status(200).json(friendRequests);
});

exports.createFriendRequest = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId);

  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  const friendRequest = await FriendRequest.create(req.body);
  const updatedRequest = await friendRequest.populate(
    "requested",
    "_id firstName lastName profilePicture"
  );

  res.status(200).json(updatedRequest);
});

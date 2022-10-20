const mongoose = require("mongoose");

const FriendRequestSchema = new mongoose.Schema(
  {
    requester: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
    requested: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "User",
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("FriendRequest", FriendRequestSchema);
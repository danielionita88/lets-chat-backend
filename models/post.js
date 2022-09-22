const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    description: String,
    image: { type: String, default: "" },
    liked: { type: Array, default: [] },
    comments: { type: Array, default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);

const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    user_id: { type: String, required: true },
    content: String,
    image: { type: String, default: " " },
    liked: { type: Array, default: [] },
    comments: { type: Array, default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);

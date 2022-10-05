const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
    description: { type: String, default: "" },
    image_url: { type: String, default: "" },
    likes: { type: Array, default: [] },
    comments: { type: Array, default: [] },
  },
  { timestamps: true }
);


module.exports = mongoose.model("Post", PostSchema);

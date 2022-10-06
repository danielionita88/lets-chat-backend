const asyncHandler = require("express-async-handler");
const Comment = require("../models/commentModel");
const Post = require("../models/postModel");

exports.getComments = asyncHandler(async (req, res) => {
  const comments = await Comment.find({post_id: req.params.post_id})
    .sort({ createdAt: -1 })
    .populate("user_id", "_id first_name last_name profile_picture");
  res.status(200).json(comments);
});

exports.createComment = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.body.post_id);

  if (!post) {
    res.status(400);
    throw new Error("Post not found");
  }
  if (!req.body.description) {
    res.status(400);
    throw new Error("Please add a comment!");
  }
  const comment = await Comment.create(req.body);
  await post.updateOne({ $push: { comments: comment._id } });
  await comment.populate("user_id", "_id first_name last_name profile_picture")
  
  res.status(201).json(comment);
});

exports.updateComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.body.comment_id);

  if (!comment) {
    res.status(400);
    throw new Error("Comment not found");
  }
  if (!req.body.description) {
    res.status(400);
    throw new Error("Please add a comment!");
  }
  await Comment.findByIdAndUpdate(req.body.comment_id, {
    description: req.body.description,
  });
  const updatedComment = await Comment.findById(req.body.comment_id);

  res.status(201).json(updatedComment);
});

exports.deleteComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.id);
  const post = await Post.findById(req.body.post_id)
  if (!comment) {
    res.status(400);
    throw new Error("Comment not found!");
  }

  if (comment.user_id.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized!");
  }
  await comment.remove();
  await post.updateOne({ $pull: { comments: comment._id } });
  res.status(200).json({ id: req.params.id });
});

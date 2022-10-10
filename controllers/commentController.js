const asyncHandler = require("express-async-handler");
const Comment = require("../models/commentModel");
const Post = require("../models/postModel");

exports.getComments = asyncHandler(async (req, res) => {
  const comments = await Comment.find({ post: req.params.postId })
    .sort({ createdAt: -1 })
    .populate("user", "_id firstName lastName profilePicture");
  res.status(200).json(comments);
});

exports.createComment = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.body.post);

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
  const updatedComment = await comment.populate("user", "_id firstName lastName profilePicture")

  res.status(201).json(updatedComment);
});

exports.updateComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.body.commentId);

  if (!comment) {
    res.status(400);
    throw new Error("Comment not found");
  }
  if (!req.body.description) {
    res.status(400);
    throw new Error("Please add a comment!");
  }
  await Comment.findByIdAndUpdate(req.body.commentId, {
    description: req.body.description,
  });
  const updatedComment = await Comment.findById(req.body.commentId);

  res.status(201).json(updatedComment);
});

exports.deleteComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.id);
  const post = await Post.findById(req.body.postId);
  
  if (!comment) {
    res.status(400);
    throw new Error("Comment not found!");
  }

  if (comment.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized!");
  }
  
  await post.updateOne({ $pull: { comments: comment._id } });
  await comment.remove();

  res.status(200).json(req.body);
});

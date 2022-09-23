const asyncHandler = require("express-async-handler");

const Post = require("../models/postModel");
const User = require("../models/userModel");

exports.getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({ user_id: req.user.id });
  res.status(200).json(posts);
});

exports.createPost = asyncHandler(async (req, res) => {
  if (!req.body.description && !req.body.image) {
    res.status(400);
    throw new Error("Please add a description or a picture!");
  }
  const post = await Post.create({
    user_id: req.user.id,
    ...req.body,
  });
  res.status(201).json(post);
});

exports.updatePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    res.status(400);
    throw new Error("Post not found!");
  }
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found!");
  }

  if (post.user_id.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized!");
  }

  const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body);
  res.status(200).json(updatedPost);
});

exports.deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    res.status(400);
    throw new Error("Post not found!");
  }

  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found!");
  }

  if (post.user_id.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized!");
  }
  await post.remove();
  res.status(200).json({ id: req.params.id });
});

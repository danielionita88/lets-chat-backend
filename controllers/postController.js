const asyncHandler = require("express-async-handler");

const Post = require("../models/postModel");

exports.getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find();
  res.status(200).json(posts);
});

exports.createPost = asyncHandler(async (req, res) => {
  const post = await Post.create(req.body);
  res.status(201).json(post);
});

exports.updatePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    res.status(400);
    throw new Error("Post not found!");
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
  await post.remove();
  res.status(200).json({ id: req.params.id });
});

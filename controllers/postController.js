const asyncHandler = require("express-async-handler");

const Post = require("../models/Post");
const User = require("../models/User");

exports.getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find();
  res.status(200).json(posts);
});

exports.createPost = asyncHandler(async (req, res) => {
  const newPost = new Post(req.body);
  const post = await newPost.save();
  res.status(201).json(post);
});

exports.updatePost = asyncHandler(async (req, res) => {
  await Post.findByIdAndUpdate(req.params.id, { $set: req.body });
  res.status(200).json("Post updated succesfully!");
});

exports.deletePost = asyncHandler(async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.status(200).json("Post deleted succesfully!");
});

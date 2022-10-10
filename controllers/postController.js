const asyncHandler = require("express-async-handler");

const Post = require("../models/postModel");
const User = require('../models/userModel')

exports.getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find()
    .sort({ createdAt: -1 })
    .populate('user','_id firstName lastName profilePicture');
  res.status(200).json(posts);
});

exports.createPost = asyncHandler(async (req, res) => {
  if (!req.body.description && !req.body.imageUrl) {
    res.status(400);
    throw new Error("Please add a description or a picture!");
  }
  const post = await Post.create({
    user: req.user.id,
    ...req.body,
  })
  await post.populate('user','_id firstName lastName profilePicture')
  res.status(201).json(post);
});

exports.updatePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    res.status(400);
    throw new Error("Post not found!");
  }

  if (!req.user) {
    res.status(401);
    throw new Error("User not found!");
  }

  if (post.user_id.toString() !== req.user.id) {
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

  if (!req.user) {
    res.status(401);
    throw new Error("User not found!");
  }

  if (post.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized!");
  }
  await post.remove();
  res.status(200).json({ id: req.params.id });
});

exports.likePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  const user = await User.findById(req.body.userId)

  if (!post) {
    res.status(400);
    throw new Error("Post not found!");
  }

  if (!user) {
    res.status(401);
    throw new Error("User not found!");
  }

  if (!post.likes.includes(user.id)) {
    await post.updateOne({ $push: { likes: user.id } });
    await user.updateOne({ $push: { likes: req.params.id } });
    res.status(200).json({postId: post._id,userId: user.id});
  } else {
    await post.updateOne({ $pull: { likes: user.id } });
    await user.updateOne({ $pull: { likes: req.params.id } });
    res.status(200).json({postId: post._id,userId: user.id});
  }
});

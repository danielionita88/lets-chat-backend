const Post = require("../models/Post");
const User = require("../models/User");

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (e) {
    res.status(500).json(e);
  }
};

exports.createPost = async (req, res) => {
  try {
    const newPost = new Post(req.body);
    const user = await User.findById(req.body.user_id);

    const post = await newPost.save();
    await user.updateOne({ $push: { posts: post._id } });
    res.status(201).json(post);
  } catch (e) {
    res.status(500).json(e);
  }
};

exports.updatePost = async (req, res) => {
  try {
    await Post.findByIdAndUpdate(req.params.id, { $set: req.body });
    res.status(200).json("Post updated succesfully!");
  } catch (e) {
    res.status(500).json(e);
  }
};

exports.deletePost = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json("Post deleted succesfully!");
  } catch (e) {
    res.status(500).json(e);
  }
};

const Post = require("../models/Post");
const User = require("../models/User");

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
    res.status(200).json(posts)
  }catch(e){
    res.status(500).json(e)
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

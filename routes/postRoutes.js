const express = require("express");
const router = express.Router();
const postsController = require("../controllers/postController");

router.get("/", postsController.getPosts);

router.post("/", postsController.createPost);

router.put("/:id", postsController.updatePost);

router.delete("/:id", postsController.deletePost);

module.exports = router;
const express = require("express");
const router = express.Router();
const postsController = require("../controllers/postController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, postsController.getPosts);

router.post("/", protect, postsController.createPost);

router.put("/:id", protect, postsController.updatePost);

router.delete("/:id", protect, postsController.deletePost);

router.patch("/:id/like", postsController.likePost)

module.exports = router;

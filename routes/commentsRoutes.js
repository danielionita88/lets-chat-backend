const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
const { protect } = require("../middleware/authMiddleware");

router.get("/:postId", commentController.getComments);

router.post("/:postId", protect, commentController.createComment);

router.put("/:id", protect, commentController.updateComment);

router.delete("/:id", protect, commentController.deleteComment);


module.exports = router;
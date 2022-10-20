const express = require("express");
const router = express.Router();
const friendRequestController = require("../controllers/friendRequestController");
const { protect } = require("../middleware/authMiddleware");

router.get("/:userId", friendRequestController.getFriendRequests);
router.post("/:userId", friendRequestController.createFriendRequest);


module.exports = router;
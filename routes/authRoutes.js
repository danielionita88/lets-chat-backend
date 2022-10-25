const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

router.get('/',authController.getUsers)
router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.put("/:id", protect, authController.updateUser);
router.delete("/:id", protect, authController.deleteUser);

module.exports = router;

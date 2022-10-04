const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");


router.post("/register", AuthController.registerUser);
router.post("/login", AuthController.loginUser);
router.put("/:id", protect, AuthController.updateUser);
router.delete("/:id", protect, AuthController.deleteUser);

module.exports = router;

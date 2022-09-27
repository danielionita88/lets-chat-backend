const express = require("express");
const router = express.Router();

const s3Controller = require("../controllers/s3Controller");
const { protect } = require("../middleware/authMiddleware");

router.get("/",protect, s3Controller.getS3Url);

module.exports = router;
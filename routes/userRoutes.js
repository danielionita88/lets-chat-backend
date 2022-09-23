const express = require("express");
const router = express.Router();
const usersController = require('../controllers/userController')
const {protect} = require('../middleware/authMiddleware')

router.put('/:id', protect, usersController.updateUser)
router.delete('/:id',protect, usersController.deleteUser)
module.exports = router
const express = require("express");
const router = express.Router();
const usersController = require('../controllers/userController')

router.put('/:id', usersController.updateUser)
router.delete('/:id', usersController.deleteUser)
module.exports = router
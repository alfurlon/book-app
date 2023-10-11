const express = require('express');
const authController = require('./../controllers/authController');
const userController = require('./../controllers/userController');
const router = express.Router();

router.post('/signup', authController.signup)
router.post('/login', authController.login)

router.get('/', userController.getAllUsers)
router.get('/:id', userController.getUserById)

module.exports = router;
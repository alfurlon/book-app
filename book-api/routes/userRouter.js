const express = require('express');
const authController = require('./../controllers/authController');
const userController = require('./../controllers/userController');
const router = express.Router();

router.post('/signup', authController.signup)
router.post('/login', authController.login)
router.delete('/deleteUser', authController.protect, userController.deleteUser)
router.get('/:id', userController.getUserById)

// Only Admin should be able to use these routes
// router.get('/', authController.protect, authController.restrict('admin'), userController.getAllUsers)
router.get('/', userController.getAllUsers)
router.delete('/deleteUser/:id', authController.restrict('admin'), userController.adminDeleteUser)


module.exports = router;
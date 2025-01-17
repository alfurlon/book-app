const express = require('express');
const { uploadCloudinary } = require('./../middleware/multerCloudinaryMiddleware');
const bookController = require('./../controllers/bookController');
const authController = require('../controllers/authController')
const router = express.Router();

router
    .route('/')
    // .get(authController.protect, bookController.getAllBooks)
    .get(bookController.getAllBooks)
    // .post(authController.protect, uploadCloudinary.single('coverPhoto'), bookController.createBook)
    .post(uploadCloudinary.single('coverPhoto'), bookController.createBook)

router
    .route('/:id')
    // .get(authController.protect, bookController.getBookById)
    .get(bookController.getBookById)
    // .patch(authController.protect, uploadCloudinary.single('coverPhoto'), bookController.updateBook)
    .patch(uploadCloudinary.single('coverPhoto'), bookController.updateBook)
    .delete(authController.protect, bookController.deleteBook)

router.route('/slug/:slug').get(bookController.getBookBySlug)

router.route('/user/:id').get(bookController.getBooksByUserId)

module.exports = router;
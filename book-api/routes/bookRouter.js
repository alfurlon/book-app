const express = require('express');
// const multerMiddleware = require('./../middleware/multerMiddleware');
const { uploadCloudinary } = require('./../middleware/multerCloudinaryMiddleware');
const bookController = require('./../controllers/bookController');
const router = express.Router();

// const uploadMiddleware = multerMiddleware();

router
    .route('/')
    .get(bookController.getAllBooks)
    .post(uploadCloudinary.single('coverPhoto'), bookController.createBook)

router
    .route('/:id')
    .get(bookController.getBookById)
    .patch(uploadCloudinary.single('coverPhoto'), bookController.updateBook)
    .delete(bookController.deleteBook)

module.exports = router;
const User = require('./../models/userModel');
const Book = require('./../models/bookModel');
const AppError = require('./../util/appError');
const catchAsync = require('./../util/catchAsync');

exports.getAllUsers = catchAsync(async (req, res, next) => {
    const users = await User.find({});

    res.status(200).json({
        status: 'success',
        result: {
            users
        }
    })
})

// !! may need to remove admin privileges here
// !! because I need this call to populate user on front end
exports.getUserById = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    // Populate bookList with full books
    let filledBookList = []
    for (const id of user.bookList) {
        const book = await Book.findById(id)
        filledBookList.push(book)
    }

    if (!user) {
        return next(new AppError('No user found', 404));
    } else {
        res.status(200).json({
            status: 'success',
            result: {
                user,
                filledBookList
            }
        })
    }
})

exports.deleteUser = catchAsync(async (req, res, next) => {
    await User.findByIdAndUpdate(req.user.id, { active: false })
    res.status(204).json({
        status: 'success',
        result: null
    })
})

// This should only be used to add books that are already created
// to the user. 
// If a new book is created the createBook route will be used instead
exports.addBookToUser = catchAsync(async (req, res, next) => {

    const book = await Book.findOne({ title: req.body.bookTitle })



})

// This is an admin route allowing them to delete a user via REST
exports.adminDeleteUser = catchAsync(async (req, res, next) => {
    await User.findByIdAndUpdate(req.params.id, { active: false })
    res.status(204).json({
        status: 'success',
        result: {
            message: 'User marked as inactive',
            userId: req.params.id
        }
    })
})

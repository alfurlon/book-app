const User = require('./../models/userModel');
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

exports.getUserById = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new AppError('No user found', 404));
    } else {
        res.status(200).json({
            status: 'success',
            result: {
                user
            }
        })
    }
})

exports.deleteUser = catchAsync(async (req, res, body) => {
    await User.findByIdAndUpdate(req.user.id, { active: false })
    res.status(204).json({
        status: 'success',
        result: null
    })
})

// This is an admin route allowing them to delete a user via REST
exports.adminDeleteUser = catchAsync(async (req, res, body) => {
    await User.findByIdAndUpdate(req.params.id, { active: false })
    res.status(204).json({
        status: 'success',
        result: {
            message: 'User marked as inactive',
            userId: req.params.id
        }
    })
})

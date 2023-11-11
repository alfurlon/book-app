const { promisify } = require('util');
const User = require('./../models/userModel');
const catchAsync = require('./../util/catchAsync');
const AppError = require('./../util/appError');
const jwt = require('jsonwebtoken');

const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}

exports.signup = catchAsync(async (req, res, next) => {
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
        passwordChangedAt: req.body.passwordChangedAt,
        role: req.body.role
    })

    const token = signToken(newUser._id)

    res.status(201).json({
        status: 'success',
        token,
        result: {
            user: newUser
        }
    })
})

exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body

    // 1. Check if email and password exist
    if (!email || !password) {
        return next(new AppError('Please provide email and password', 400));
    }

    // 2. Check if user exists and if password is correct
    const user = await User.findOne({ email }).select('+password')

    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppError('Incorrect email or password', 401));
    }

    // 3. Send Token to client
    const token = signToken(user._id)

    res.status(200).json({
        status: 'success',
        token
    })
})

exports.protect = catchAsync(async (req, res, next) => {
    // 1. Get token and check if it exists
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]
    }

    if (!token) {
        return next(new AppError('You are not logged in. Please log in', 401))
    }

    // 2. Verify token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    console.log(decoded);

    // 3. Check if user still exists
    const freshUser = await User.findById(decoded.id);
    if (!freshUser) {
        return next(new AppError('That user does not exist', 401));
    }

    // console.log(`Fresh User: ${JSON.stringify(freshUser, null, 2)}`)
    // 4. Check if user changed passwords after the token was issued
    // if (freshUser.changedPasswordAfter(decoded.iat)) {
    //     return next(new AppError('Password was recently changed. Please login again', 401));
    // }

    // Grant access to route
    req.user = freshUser;

    next();
})

// Allows to take arguments in restrict function
exports.restrict = (...roles) => {
    return (req, res, next) => {
        // this req.user comes from the protect middleware
        // protect must be run first
        if (!roles.includes(req.user.role)) {
            return next(new AppError('You do not have permission to perform this action', 403));
        }

        next();
    }
}
const AppError = require('./../util/appError')
// Global Error Handling

const handleCastErrorDB = err => {
    const message = `Invalid ${err.path}: ${err.value}`;
    return new AppError(message, 400);
}

const handleJWTError = err => new AppError('Invalid Token. Please login again', 401);

const handleJWTExpiredError = err => new AppError('Token has expired. Please login again', 401);

const handleDuplicateFieldsDB = err => {
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
    console.log(value);
  
    const message = `Duplicate field value: ${value}. Please use another value!`;
    return new AppError(message, 400);
};

const handleValidationErrorDB = err => {
    const errors = Object.values(err.errors).map(el => el.message);
  
    const message = `${errors.join('. ')}`;
    return new AppError(message, 400);
};

module.exports = ((err, req, res, next) => {
    // console.log(err.stack);
    console.log(err)

    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    let error = Object.assign(err);

    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === 'ValidationError') error = handleValidationErrorDB(error);
    if (error.name === 'JsonWebTokenError') error = handleJWTError(error);
    if (error.name === 'TokenExpiredError') error = handleJWTExpiredError(error);

    res.status(error.statusCode).json({
        status: error.status,
        message: error.message
    })
})
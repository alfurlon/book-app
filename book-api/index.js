const express = require('express');
const AppError = require('./util/appError')
const globalErrorHandler = require('./controllers/errorController')
const bookRouter = require('./routes/bookRouter');
const userRouter = require('./routes/userRouter')
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// app.use((req, res, next) => {
//     console.log(req.body);
//     next();
// })

app.use('/api/v1/books', bookRouter);
app.use('/api/v1/users', userRouter);

// app.get('/', (req, res) => {
//     res.send('Welcome')
// })

app.all('*', (req, res, next) => {
    // If next receives any argument it will always assume its an error
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
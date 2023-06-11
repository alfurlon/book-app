const express = require('express');
// const AppError = require('./util/appError')
const bookRouter = require('./routes/bookRouter');
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// app.use((req, res, next) => {
//     console.log(req.body);
//     next();
// })

app.use('/api/v1/books', bookRouter);

app.get('/', (req, res) => {
    res.send('Welcome')
})

// app.all('*', (req, res, next) => {
//     // If next receives any argument it will always assume its an error
//     next(new AppError('you fucked up', 404));
// });

// // Global Error Handling
// app.use((err, req, res, next) => {
//     console.log(err.stack);

//     err.statusCode = err.statusCode || 500;
//     err.status = err.status || 'error';

//     res.status(err.statusCode).json({
//         status: err.status,
//         message: err.message
//     })
// } )

module.exports = app;
const express = require('express')
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize')
const xss = require('xss-clean')
const hpp = require('hpp')
const cors = require('cors')
const AppError = require('./util/appError')
const globalErrorHandler = require('./controllers/errorController')
const bookRouter = require('./routes/bookRouter')
const userRouter = require('./routes/userRouter')
const app = express()

// Enable CORS for all routes
// Update later
app.use(cors())

// Set security HTTP Headers
// Put this at the beginning of middlewares
app.use(helmet())

// Middleware to parse JSON request bodies
app.use(express.json())

// Data sanitization against NoSQL Query injection
app.use(mongoSanitize())

// Data sanitization against XSS
app.use(xss())

// Prevent parameter pollution
// Can provide a whitelist of duplicates if necessary
app.use(hpp())

// Limits calls from one IP to 100 per hour (windowms)
// Could be used to monetize API
// Not turning on during development
// const limiter = rateLimit({
//     max: 100,
//     windowMs: 60 * 60 * 1000,
//     message: 'Too many requests from this IP, try again in an hour'
// })
// app.use('/api', limiter)

// app.use((req, res, next) => {
//     console.log(req.body, req.url, req.method);
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
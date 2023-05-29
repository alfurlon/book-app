const express = require('express');
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

module.exports = app;
const mongoose = require('mongoose');
const slugify = require('slugify');
const Author = require('./authorModel');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'A book must have a title'],
        // !! Regex validation for what title should be?
        unique: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author',
        required: [true, 'A book must have an author']
    },
    summary: {
        type: String,
    },
    slug: {
        type: String,
    },
    coverPhoto: {
        type: String,
        required: [true, 'A book must have a photo']
    },
    publishedDate: {
        type: Date
    },
    genre: {
        type: String
    },
    pages: {
        type: Number
    },
    haveRead: {
        type: Boolean
    },
    yearRead: {
        type: Number,
        min: [2000, 'The year must be after 2000'],
        max: [new Date().getFullYear(), 'The year cannot be in the future.']
    }
});

bookSchema.pre('save', function(next) {
    this.slug = slugify(this.title, { lower: true });
    next();
})

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
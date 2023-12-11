const mongoose = require('mongoose');
const slugify = require('slugify');
const Author = require('./authorModel');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'A book must have a title'],
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
        unique: true
    },
    coverPhoto: {
        type: String,
        // turning photo off for testing
        // required: [true, 'A book must have a photo']
    },
    publishedDate: {
        type: String
    },
    genre: {
        type: String
    },
    pages: {
        type: Number
    }
});

bookSchema.pre('save', function(next) {
    this.slug = slugify(this.title, { lower: true });
    next();
})

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
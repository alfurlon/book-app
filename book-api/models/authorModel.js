const mongoose = require('mongoose');
const slugify = require('slugify');

const authorSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Author must have a first name']
    },
    lastName: {
        type: String,
        required: [true, 'Author must have a last name']
    }
});

// authorSchema.pre('save', function(next) {
//     this.slug = slugify(this.name, { lower: true });
//     next();
// });

const Author = mongoose.model('Author', authorSchema);

module.exports = Author;
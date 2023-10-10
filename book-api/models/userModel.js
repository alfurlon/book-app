const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required']
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        minlength: 8
    },
    passwordConfirm: {
        type: String,
        required: [true, 'passwordConfirm is required'],
        validate: {
            // !! this only works on create and save
            // !! so when updating must use create or save
            validator: function(el) {
                return this.password === el
            },
            message: "passwords are not the same"
        }
    }
})

// Middleware function that encrypts passwords before it's saved
userSchema.pre('save', async function(next) {
    // Only runs if password was modified
    if (!this.isModified('password')) return next()

    this.password = await bcrypt.hash(this.password, 12)

    this.passwordConfirm = undefined
    next();
})

const User = mongoose.model('User', userSchema);

module.exports = User;

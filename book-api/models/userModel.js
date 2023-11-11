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
        minlength: 8,
        select: false
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
    },
    passwordChangedAt: {
        type: Date
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
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

// Middleware to check if given password matches one stored in db
userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword)
}

userSchema.methods.changedPasswordAfter = async function(JWTTimestamp) {
    if (this.passwordChangedAt) {
        // convert passwordChangedAt to milliseconds
        const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10)
        
        return JWTTimestamp < changedTimestamp
    }

    return false;
}

const User = mongoose.model('User', userSchema);

module.exports = User;

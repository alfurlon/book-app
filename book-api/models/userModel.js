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
    // passwordChangedAt: {
    //     type: Date
    // },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    active: {
        type: Boolean,
        default: true,
        select: false
    },
    bookList: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Book'
    },
    haveRead: {
        type: Map,
        of: Boolean
    },
    yearRead: {
        type: Map,
        of: Number
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

// This is just an example of what password reset protection could look like
// userSchema.methods.changedPasswordAfter = async function(JWTTimestamp) {
//     if (this.passwordChangedAt) {
//         // convert passwordChangedAt to milliseconds
//         const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10)
//         console.log(changedTimestamp, JWTTimestamp)
        
//         return JWTTimestamp < changedTimestamp
//     }

//     return false;
// }

// Makes sure inactive users don't show up in queries
userSchema.pre(/^find/, function(next) {
    // this checks for a query that starts with 'find'
    this.find({ active: { $ne: false } })
    next()
})

const User = mongoose.model('User', userSchema);

module.exports = User;

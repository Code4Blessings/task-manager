const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        default: 0,
        required: true,
        trim: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 7,
        validate(value) {
            if(value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain password')
            }
        },
    }, 
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if(value < 0) {
                throw new Error("Age must be a positive number")
            } 
        }
    },
     tokens: [{
            token: {
                type: String,
                required: true
            }
        }]
})

//To create a relational database
userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id', //primary key
    foreignField: 'owner' //foreign key
})

//This is to hide private data
userSchema.methods.toJSON = function () {
    const user = this
    //user.toObject (from mongoose) will give us an Object with justthe user data we want and change what we want to expose
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject
}

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({_id: user._id.toString()}, 'keepitsecretkeepitsafe')

    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email: email })

    if(!user) {
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    
    if(!isMatch){
        throw new Error('Unable to login')
    }
    return user
}

//Hash the plain text password before saving
//Arrow functions don't work here
userSchema.pre('save', async function(next) {
    const user = this
    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

//Delete user tasks when user is removed

const User = mongoose.model('User', userSchema)

module.exports = User

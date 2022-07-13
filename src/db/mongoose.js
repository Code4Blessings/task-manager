const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api')

// Challenge: Add a password field to user

// 1. Setup the field as a required string
// 2. Ensure the length is greater than 6
// 3. Trim the password
// 4. Ensure the password doesn't contain "password"
// 5. Test your work!

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        default: 0,
        required: true,
        trim: true,
        lowercase: true,
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
            if(value.toLowercase().includes('password')) {
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
    }
})

const me = new User({
    name: 'Sam',
    email: 'sam@email.com',
    password: 'password',
    age: 80
})

me.save().then((me) => {
    console.log(me)
}).catch((error) => {
    console.log('Error', error)
})

// const Task = mongoose.model('Task', {
//     description: {
//         type: String,
        
//     },
//     completed: {
//         type: Boolean
//     }
// })

// const todo = new Task({
//     description: 'Make the tomato sauce',
//     completed: false
// })

// todo.save().then((todo) => {
//     console.log(todo)
// }).catch((error) => {
//     console.log('Error', error)
// })



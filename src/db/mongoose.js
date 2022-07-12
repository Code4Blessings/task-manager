const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api')

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    }, 
    age: {
        type: Number,
        validate(value) {
            if(value < 0) {
                throw new Error("Age must be a positive number")
            } 
        }
    }
})

const me = new User({
    name: 'Jean',
    email: 'jean@'
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



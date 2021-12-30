const mongoose = require('mongoose')
const validator = require('validator')

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api')
}
// Goal: Add a password field to User
//1. Setup the field as a required string
//2. Ensure the length is greater than 6
//3. Trim the password
//4. Ensure that password doesn't contain "password"
//5. Test your work

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
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
        validate(value) {
            if(value.length < 6) {
                throw new Error('Password must be at least 6 characters')
            }
            if(value.includes('password')) {
                throw new Error('Password cannot contain the word \'password\' ')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if(value < 0) {
                throw new Error('Age must be a positive number')
            }
        }
    }
})

// const me = new User({
//     name: 'Christine',
//     email: 'christine@email.com',
//     password: 'pa1234'
// })

// me.save().then((me) => {
//     console.log(me)
// }).catch((error) => {
//     console.log(error)
// })

//Goal: Add a validation and santization to task
//1. Trim the description and make it required
//2. Make completed optional and default it to false
//3. Test your work with and without errors

const Task = mongoose.model('Task', {
    description: {
        type: String,
        trim: true,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
})

const task = new Task({
    description: 'Make breakfast',
    //completed: true
})

task.save().then(() => {
    console.log(task)
}).catch((error) => {
    console.log(error)
})
const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api')

const User = mongoose.model('User', {
    name: {
        type: String
    }, 
    age: {
        type: Number
    }
})

// const me = new User({
//     name: 'Robin',
//     age: 'Ann'
// })

// me.save().then((me) => {
//     console.log(me)
// }).catch((error) => {
//     console.log('Error', error)
// })

const Task = mongoose.model('Task', {
    description: {
        type: String
    },
    completed: {
        type: Boolean
    }
})

const todo = new Task({
    description: 'Make the tomato sauce',
    completed: false
})

todo.save().then((todo) => {
    console.log(todo)
}).catch((error) => {
    console.log('Error', error)
})



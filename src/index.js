const express = require('express')
const mongoose = require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.post('/users', (req, res) => {
    const user = new User(req.body)

    user.save().then(() => {
        res.status(201).send(user)
    }).catch((error) => {
        res.status(400).json({
            errorMessage: error.message
        })
    })
})

app.get('/users', (req, res) => {
    User.find({})
})

app.post('/tasks', (req, res) => {
    const task = new Task(req.body)

    task.save().then(() => {
        res.status(201).send(task)
    }).catch((error) => {
        res.status(400).json({
            errorMessage: error.message
        })
    })
})

app.listen(port, () => {
    console.log('Server is listening on port ' + port)
})
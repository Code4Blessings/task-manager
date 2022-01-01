const express = require('express')
require('./db/mongoose')

const User = require('./models/user')
const Task = require('./models/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

// Get Users

app.get('/users', (req, res) => {
    User.find({}).then((users) => {
        res.status(200).send(users)
    }).catch((error) => {
        res.status(500).send()
    })
})

// Get User By Id

app.get('/users/:id', (req, res) => {
    const _id = req.params.id

    User.findById(_id).then((user) => {
        if(!user) {
            return res.status(404).json({ errorMessage: "User Id not found" })
        }
        res.send(user)
    }).catch((e) => {
        res.status(500).json({
            errorMessage: "Internal Server Error",
            message: e.message
        })
    })
})
    
// Create Users

app.post('/users', (req, res) => {
    const user = new User(req.body)

    user.save().then(() => {
        res.send(user)
    }).catch((error) => {
        res.status(400).send(error)
    })
})

// Get Tasks

app.get('/tasks', (req, res) => {
    Task.find({}).then((task) => {
        res.status(200).send(task)
    }).catch((err) => {
        res.status(500).json({
            errorMessage: "Internal server error",
            message: err.message
        })
    })
})

// Get Task by ID

app.get('/tasks/:id', (req, res) => {
    const _id = req.params.id

    Task.findById(_id).then((task) => {
        if(!task) {
            return res.status(404).json({
                errorMessage: "Task Id not found"})
        }
        res.status(200).send(task)
    }).catch((err) => {
        res.status(500).json({
            errorMessage: "Internal server error",
            message: err.message
        })
    })
})

// Create Tasks

app.post('/tasks', (req, res) => {
    const task = new Task(req.body)

    task.save().then(() => {
        res.status(201).send(task)
    }).catch((error) => {
        res.status(400).send(error)
    })
})

app.listen(port, () => {
    console.log("Server is listening on port " + port)
})
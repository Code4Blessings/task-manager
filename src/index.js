const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
         res.status(201).send(user)
    }catch(e) {
        res.status(400).json({
             errorMessage: e.message
        })
    }
})

app.get('/users', async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    }catch(e) {
        res.status(404).send()
    }
})

app.get('/users/:id', async (req, res) => {
    try {
        const _id = req.params.id
        const user = await User.findById(_id)
        if(!user) {
            return res.status(404).send()
        }
        res.status(200).send(user)
    }catch(e) {
        res.status(500).json({ errorMessage: e.message})
    }
})

app.post('/tasks', async (req, res) => {
    const task = new Task(req.body)
    try {
        await task.save()
        res.status(201).send(task)
    }catch(e) {
        res.status(400).json({
            errorMessage: error.message
        })
    }
})

app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({})
         res.send(tasks)
    }catch(e) {
        res.status(500).json({
            errorMessage: e.message
        })
    }
})

app.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const task = await Task.findById(_id)
        if(!task) {
            res.status(404).send()
        }
        res.status(200).send(task)
    }catch(e) {
        res.status(500).json({
            errorMessage: e.message
        })
    }
})

app.listen(port, () => {
    console.log('Server is listening on port ' + port)
})
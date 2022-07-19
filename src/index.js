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
             error: e.message
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
        res.status(500).json({ error: e.message})
    }
})

app.patch('/users/:id', async (req,res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation) {
        return res.status(400).send({error: 'Invalid updates'})
    }
    try {
        const _id = req.params.id
        const user = await User.findByIdAndUpdate(_id, req.body, {new: true, runValidators: true})
        if(!user) {
            return res.status(404).send()
        }
        res.send(user)
    }catch(e) {
        res.status(400).json({
            error: e.message
        })
    }
})


app.post('/tasks', async (req, res) => {
    const task = new Task(req.body)
    try {
        await task.save()
        res.status(201).send(task)
    }catch(e) {
        res.status(400).json({
            error: error.message
        })
    }
})

app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({})
         res.send(tasks)
    }catch(e) {
        res.status(500).json({
            error: e.message
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
            error: e.message
        })
    }
})

app.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation) {
        res.status(400).send('Invalid Update')
    }
    try{
        const _id = req.params.id
        const task = await Task.findByIdAndUpdate(_id, req.body, {new: true, runValidators: true})
        if(!task) {
            return res.status(404).send()
        }
        res.send(task)
    }catch(e) {
        res.status(500).json({
            error: e.message
        })
    }
})

app.listen(port, () => {
    console.log('Server is listening on port ' + port)
})
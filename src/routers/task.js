const express = require('express')
const router = require('express').Router()
//require('../db/mongoose')
const auth = require('../middleware/auth')
const Task = require('../models/task')

router.post('/', auth, async (req, res) => {
    //const task = new Task(req.body)
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })
    try {
        await task.save()
        res.status(201).send(task)
    }catch(e) {
        res.status(400).json({
            error: error.message
        })
    }
})

router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find({})
         res.send(tasks)
    }catch(e) {
        res.status(500).json({
            error: e.message
        })
    }
})

router.get('/:id', async (req, res) => {
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

router.patch('/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation) {
        res.status(400).send('Invalid Update')
    }
    try{
        const _id = req.params.id
        const task = await Task.findById(_id)
        updates.forEach((update) => task[update] = req.body[update])

        await task.save()
        // const task = await Task.findByIdAndUpdate(_id, req.body, {new: true, runValidators: true})
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

router.delete('/:id', async (req, res) => {
    try {
        const _id = req.params.id
        const task = await Task.findByIdAndDelete(_id)
        if(!task) {
            return res.status(404). send()
        }
        res.send(task)
    }catch(e) {
        res.status(500).json({error: e.message})
    }       
})

module.exports = router
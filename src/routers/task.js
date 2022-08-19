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


//limit allows you to limit the amount of data on each page
//skip allows you to iterate over pages.  If the limit is 10 and skip is 0, then I get the first 10 results. If my limit is 10 and I skip 10 then I get the next 10 results on the second page.  If I skip 20, I get the 10 results on the third page.
//SortBy
//descending is 1, and ascending is -1
//completed: -1 will put the completed tasks on the top and the incompletes obn the bottom. 1 will give vice versa
//GET /tasks?completed=false
//GET /tasks?limit=10&skip=10
//GET /tasks?sortBy=createdAt:desc
// desc for descending and asc for ascending
router.get('/', auth, async (req, res) => {
    const match = {}
    const sort = {}
    if(req.query.completed) {
        match.completed = req.query.completed === 'true'
    }
    if(req.query.sortBy) {
        //The variable "parts" will be an array
        const parts = req.query.sortBy.split(':')
        //Instead of doing sort.completed or sort.createdAt, use whatever is first in the parts array. The below states that in the parts array, the first value is equal to 1 of 2 conditions. If it is equal to 'desc' then apply -1 (because that is how you define desc, asc equals 1). This will make sortBy dynamic to whatever query is written in that regard.
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }
    try {
       await req.user.populate({
        path: 'tasks',
        match,
        options: {
            //parseInt - allows us to parse a string that contains a number into an actual integer
            limit: parseInt(req.query.limit),
            skip: parseInt(req.query.skip),
            sort
        }
       })
         res.send(req.user.tasks)
    }catch(e) {
        res.status(500).json({
            error: e.message
        })
    }
})

router.get('/:id', auth, async (req, res) => {
    const _id = req.params.id
    try {
        //const task = await Task.findById(_id)
        const task = await Task.findOne({
            _id, 
            owner: req.user._id
        })

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

router.patch('/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation) {
        res.status(400).send('Invalid Update')
    }
    try{
        const task = await Task.findOne({
            _id: req.params.id,
            owner: req.user._id
        })
        // const task = await Task.findByIdAndUpdate(_id, req.body, {new: true, runValidators: true})
        if(!task) {
            return res.status(404).send()
        }
        updates.forEach((update) => task[update] = req.body[update])
        await task.save()
        res.send(task)
    }catch(e) {
        res.status(500).json({
            error: e.message
        })
    }
})

router.delete('/:id', auth, async (req, res) => {
    try {
        const _id = req.params.id
        const task = await Task.findOneAndDelete({
            _id,
            owner: req.user._id
        })
        if(!task) {
            return res.status(404). send()
        }
        res.send(task)
    }catch(e) {
        res.status(500).json({error: e.message})
    }       
})

module.exports = router
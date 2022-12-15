const express = require('express')
const router = require('express').Router()
const auth = require('../middleware/auth')
require('../db/mongoose')
const User = require('../models/user')
const multer = require('multer')



//Signup Route
//This route generates a token so that the user doesn't have to go in and sign in again after signing up
router.post('/', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user, token})
    }catch(e) {
        res.status(400).json({
             error: e.message
        })
    }
})

//Signin Route
//Also generates a token
router.post('/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        console.log(user)
        res.send({user, token})
    }catch(e) {
        res.status(400).json({error: e.message})
    }
})

//Logout Route - logout of just one session
router.post('/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    }catch (e) {
        res.status(500).send()
    }
})

//Logout of all sessions
router.post('/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    }catch(e) {
        res.status(500).send()
    }
})

//This will allow someone to get their own profile
router.get('/profile', auth, async (req, res) => {
    res.send(req.user)
})


router.patch('/profile', auth, async (req,res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation) {
        return res.status(400).send({error: 'Invalid updates'})
    }
    try {
        // const _id = req.params._id
        // const user = await User.findById(_id)
        updates.forEach((update) => req.user[update] = req.body[update])

        await req.user.save()
        // if(!user) {
        //     return res.status(404).send()
        // }
        res.send(req.user)
    }catch(e) {
        res.status(400).json({
            error: e.message
        })
    }
})

//This allows a logged in user to delete their own profile
router.delete('/profile', auth, async (req, res) => {
    try {
        // const _id = req.params._id
        // const user = await User.findByIdAndDelete(_id)
        // if(!user) {
        //     return res.status(404).send()
        // }
        await req.user.remove()
        res.send(req.user)
    }catch(e) {
        res.status(500).json({error: e.message})
    }
})

//File Uploads

const avatar = multer({
    dest: 'avatars',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an image'))
        }
        cb(undefined, true)
    }
})
router.post('/profile/avatar', auth, avatar.single('avatar'), (req, res) => {
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message})
})

module.exports = router
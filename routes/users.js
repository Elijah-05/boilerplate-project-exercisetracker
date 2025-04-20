const express = require('express')
const router = express.Router()
const User = require('../models/User')
const Exercise = require('../models/Exercise')

router.post('/', async (req, res) => {
    const username = req.body.username
    if(!username) {
        return res.status(400).json({error: 'User name is required'})
}
    const user = await User.findOne({username})
    if(user) {
        return res.json({username: user.username, _id: user._id})
    }
    try {
        const newUser = new User({username})
        const savedUser = await newUser.save()
        res.json({username: savedUser.username, _id: savedUser._id})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

router.get('/:id/logs', async(req, res) => {
    const id = req.params.id
    try {
        const user = await User.findById(id)
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

router.get('/', async (_, res) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

module.exports = router
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

router.post("/:id/exercises", async (req, res) => {
    const userId = req.params.id
    const { description, duration, date } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
  
    const exercise = new Exercise({
      userId: user._id,
      description,
      duration: parseInt(duration),
      date: date ? new Date(date) : new Date()
    });
  
    const savedExercise = await exercise.save();
  
    res.json({
      _id: user._id,
      username: user.username,
      date: savedExercise.date.toDateString(),
      duration: savedExercise.duration,
      description: savedExercise.description
    });
})

router.get('/:id/logs', async(req, res) => {
    const id = req.params.id

    try {
        const user = await User.findById(id)
        const exercise = await Exercise.find({userId: user._id})
        res.status(200).json({username: user.username, _id: user._id, count: exercise.length, log: exercise})
    } catch (error) {
        res.status(400).json({error: "User not found"})
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
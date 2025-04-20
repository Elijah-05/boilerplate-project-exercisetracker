const express = require('express')
const router = express.Router()
const User = require('../models/User')
const Exercise = require('../models/Exercise')

router.post('/', async (req, res) => {
    const userName = req.body.userName
    if(!userName) res.status(400).json({error: 'User name is required'})

        
    try {
        const newUser = newUser
    } catch (error) {
        
    }
})

module.exports = router
const express = require('express')
const mongoose = require('mongoose')
const connectMongoDB = require('./config/db.js')
const app = express()
const cors = require('cors')
require('dotenv').config()

app.use(cors())
app.use(express.static('public'))

// Connect DB
connectMongoDB()
const userRouter = require('./routes/users.js')

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app.use('/api/user', userRouter)

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})

const { Schema, model } = require('mongoose')

const ExerciseSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId, ref: 'User'
    },
    description: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = model('Exercise', ExerciseSchema)
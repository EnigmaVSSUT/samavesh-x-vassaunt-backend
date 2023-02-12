const mongoose = require('mongoose')
const Schema = mongoose.Schema

const eventSchema = new Schema({
    eventName:{
        type: String,
        required: true
    },
    eventDescription: {
        type: String,
        required: true
    },
    posterUrl: {
        type: String,
        required: true
    },
    venue:{
        type: String,
        required: true
    },
    organiser:{
        type: String,
        required: true
    },
    startTime:{
        type: Number,
        required: true
    },
    endTime: {
        type: Number,
        required: true
    },
    firstPrize:{
        type: Number,
        required: true
    },
    secondPrize:{
        type: Number,
        required: true
    },
    thirdPrize:{
        type: Number,
        required: true
    },
    participants: [
        {
            type: String
        }
    ]
}, {timestamps: true})

module.exports = mongoose.model('events', eventSchema)
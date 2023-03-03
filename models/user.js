const mongoose = require('mongoose')
const Schema = mongoose.Schema


const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isVssutian: {
        type: Boolean,
        required: true,
        default: false
    },
    regdNo: {
        type: String,
    },
    events: [
        {
            type: mongoose.Types.ObjectId, ref: "Event"
        }
    ],
    college: { type: String, required: true },
    graduationYear: { type: Number, required: true },
    branch: { type: String, required: true },
    paymentStatus: { type: Boolean, required: true, default: false },
    paymentType: {type: Number},
    ticketGenerated: { type: Boolean, required: true, default: false },
    phone: { type: String, required: true }
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)
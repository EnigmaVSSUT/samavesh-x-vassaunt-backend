const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')

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
}, { timestamps: true })


userSchema.statics.login = async function (email, password) {
    if (!email || !password) {
        res.json({
            success: false,
            "message": "All fields must be filled"
        })
    }

    const user = await this.findOne({ email })
    if (!user) {
        res.json({
            success: false,
            "message": 'Email not registered'
        })
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        res.json({
            success: false,
            "message": "Incorrect Password"
        })
    }

    return user
}

module.exports = mongoose.model('user', userSchema)
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
    password:{
        type: String,
        required: true
    },
    isVssutian:{
        type: Boolean,
        required: true,
        default: false
    },
    regdNo:{
        type: String,
    },
    events: [
        {
            type: String
        }
    ]
}, {timestamps: true})

userSchema.statics.signup = async function(username, email, password, isVssutian, regdNo){

    if(!email || !password || !username || !isVssutian){
        throw Error('All fields must be filled')
    }

    const emailExist = await this.findOne({email});
    const regdExist = await this.findOne({regdNo});

    if(emailExist || regdExist){
        throw Error("Email or registration number already in use");
    }

    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(password, salt)

    const user = this.create({username, email, password: hash, isVssutian, regdNo, events:[]})

    return user
}

userSchema.statics.login = async function(email, password){
    if(!email || !password){
        throw Error("All fields must be filled")
    }

    const user = await this.findOne({email})
    if(!user){
        throw Error('Email not registered')
    }

    const match = await bcrypt.compare(password, user.password)

    if(!match){
        throw Error("Password incorrect")
    }

    return user
}

userSchema.methods.addEvents = function(event){
    const eventIndex = this.events.findIndex(eventName => {
        return eventName === event.eventName
    })

    const updatedEvents = [...this.events]

    if(eventIndex >= 0){
        throw Error("Already Registered for the event")
    }
    else{
        updatedEvents.push(event.eventName)
    }
    
    this.events = updatedEvents
    return this.save();
}

userSchema.methods.deleteEvents = function(event){
    const eventIndex = this.events.findIndex(eventName => {
        return eventName === event.eventName
    })
    // console.log(eventIndex)
    this.events.splice(eventIndex, 1)
    // console.log(this.events)
    // this.events = updatedEvents

    return this.save()
}

module.exports = mongoose.model('user', userSchema)
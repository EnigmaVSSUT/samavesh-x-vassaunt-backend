const User = require('../models/user')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')


const sendOTPVerification = async(email, res)=>{

    const transporter = nodemailer.createTransport({
        "host": "smtp-mail.outlook.com",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    })
    
    try {
        const otp = `${Math.floor(1000 + Math.random()*9000)}`
    
        const mailOption = {
            from: process.env.EMAIL,
            to: email,
            subject: "Verify your Email",
            html: `<p>Enter <b>${otp}</b> to verify your email. <b>OTP will expire in 10 minutes.</b></p>`
        }
    
        await transporter.sendMail(mailOption)

        res.json({
            otp: `${otp}`,
            message: "Verification OTP sent to mail"
        })    
    } catch (error) {
        res.json({
            "err": error.message,
            "status": "failed",
            "message": "Verification OTP is not sent"
        })
    }

}

const createToken = (_id)=>{
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn:'1d' })
}

exports.postSignUp = async(req, res, next)=>{
    const {username, email, password, isVssutian, regdNo} = req.body
    console.log(email)
    sendOTPVerification(email, res)

    // try{

    //     const user = await User.signup(username, email, password, isVssutian, regdNo)
    //     const token = createToken(user._id)
    //     res.json({email, token})

    // }catch(err){
    //     res.json({msg: err.message});
    // }
}

exports.postLogin = async(req, res, next)=>{
    const {email, password} = req.body

    try{ 
        const user = await User.login(email, password)
        const token = createToken(user._id)

        res.json({user, token})
    }catch(err){
        res.json({msg: err.message})
    }
}

exports.postAddEvent = async(req, res, next)=>{
    // console.log(req.headers)
    const {authorization} = req.headers
    const {event} = req.body

    if(!authorization){
        res.json({msg: "Login to participate"})
        return
    }

    // console.log(authorization);
    const token = authorization.split(" ")[1]
    // console.log(token);

    const {_id} = jwt.verify(token, process.env.SECRET)

    // console.log(_id)

    User.findById(_id).then(async(user) => {
        const addEvent = await user.addEvents(event)
        res.json(addEvent)
    }).catch(err => {res.json({msg: err.message})})
}

exports.postDeleteEvent = async(req, res, next)=>{
    const {authorization} = req.headers
    const {event} = req.body

    if(!authorization){
        res.json({msg: "Login to participate"})
        return
    }

    const token = authorization.split(" ")[1]

    const {_id} = jwt.verify(token, process.env.SECRET)

    User.findById(_id).then(async(user) => {
        const deleteEvent = await user.deleteEvents(event)
        res.json(deleteEvent)
    }).catch(err => {res.json({msg: err.message})})

}
const User = require('../../models/user')
const {sendOTPVerification} = require('../../controllers/Auth/otp')

const signUp = (req, res, next)=>{
    const { username, email, password, isVssutian, regdNo } = req.body
    sendOTPVerification(email, res)
}
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const createToken = (_id)=>{
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn:'1d' })
}

exports.postSignUp = async(req, res, next)=>{
    const {username, email, password, isVssutian, regdNo} = req.body

    try{

        const user = await User.signup(username, email, password, isVssutian, regdNo)
        const token = createToken(user._id)
        res.json({email, token})

    }catch(err){
        res.json({msg: err.message});
    }
}

exports.postLogin = async(req, res, next)=>{
    const {email, password} = req.body

    try{ 
        const user = await User.login(email, password)
        const token = createToken(user._id)

        res.json({email, token})
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
        // console.log(user)
        const addEvent = await user.addEvents(event)
        res.json(addEvent)
    }).catch(err => {res.json({msg: err.message})})
}
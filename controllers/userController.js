const User = require('../models/user')

exports.postSignUp = async(req, res, next)=>{
    const {username, email, password, isVssutian, regdNo} = req.body

    try{

        const user = await User.signup(username, email, password, isVssutian, regdNo)
        res.json(user)

    }catch(err){
        res.json({'msg': err.message});
    }
}

exports.postLogin = async(req, res, next)=>{
    const {email, password} = req.body

    try{
        const user = await User.login(email, password)
        res.json(user)
    }catch(err){
        res.json({'msg': err.message})
    }
}

exports.postAddEvent = async(req, res, next)=>{
    const {userId, event} = req.body

    User.findById(userId).then(async(user) => {
        // console.log(user)
        const addEvent = await user.addEvents(event)
        res.json(addEvent)
    }).catch(err => {res.json({'msg': err.message})})
}
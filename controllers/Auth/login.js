const User = require('../../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const login = async(req, res, next)=>{

    try {
        const {email, password} = req.body

        if (!email || !password) {
            res.json({
                success: false,
                message: "All fields must be filled"
            })
        } else {
            const user = await User.findOne({email})
    
            if (!user) {
                res.json({
                    success: false,
                    message: 'Email not registered'
                })
            } else {
    
                const match = await bcrypt.compare(password, user.password)
        
                if (!match) {
                    res.json({
                        success: false,
                        message: "Incorrect Password"
                    })
                } else{
                    const userId = user._id
                
                    const token = jwt.sign({userId}, process.env.SECRET)
                    
                    res.json({
                        success: true,
                        token,
                        message: "Login successful"
                    })
                }
            }
        }    
    } catch (error) {
        res.json({
            success: false,
            message: "Problem occured internally"
        })
    }

}

module.exports = login
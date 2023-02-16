const User = require('../../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const signUp = async (req, res, next)=>{
    const { username, email, password, isVssutian, regdNo, college, graduationYear, branch, phone } = req.body

    
    try {
        if (!email || !password || !username || isVssutian == null || !college || !graduationYear || !branch || !phone) {
            res.json({
                success: false,
                message: 'All fields must be filled'
            })
        } else{
            const emailExist = await User.findOne({ email });
            const regdExist = await User.findOne({ regdNo });
        
            if (emailExist || regdExist) {
                res.json({
                    success: false,
                    message: "Email or registration number already in use"
                })
            } else{

                const salt = await bcrypt.genSalt(12);
                const hash = await bcrypt.hash(password, salt)
        
                const user = new User({
                    username, 
                    email, 
                    password: hash, 
                    isVssutian: isVssutian, 
                    regdNo, 
                    events: [],  
                    college,
                    graduationYear,
                    branch,
                    paymentStatus: isVssutian,
                    ticketGenerated: isVssutian,
                    phone
                })
        
                user.save().then(user => {
                    const userId = user._id;
                
                    const token = jwt.sign({userId}, process.env.SECRET)
                
                    res.json({
                        token,
                        success: true,
                        message: "Registration successful"
                    })
                }).catch(error => {
                    res.json({
                        success: false,
                        message: "Oops! Error occured while signing up",
                        err: error.message
                    })
                })
            }
        }       
    } catch (error) {
        res.json({
            message: "Error occured Internally",
            success: false,
            err: error.message
        })
    }
    
}

module.exports = signUp
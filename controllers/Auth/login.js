const User = require('../../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const login = async (req, res, next) => {

    try {
        const { email, password } = req.body

        if (!email || !password) {
            res.json({
                success: false,
                message: "All fields must be filled"
            })
        } else {
            const user = await User.findOne({ email })

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
                } else {
                    const userId = user._id;
                    const email = user.email;
                    const isVssutian = user.isVssutian;
                    const regdNo = user.regdNo;
                    const events = user.events;
                    const college = user.college;
                    const graduationYear = user.graduationYear;
                    const branch = user.branch;
                    const paymentStatus = user.paymentStatus;
                    const phone = user.phone;
                    const username = user.username


                    const token = jwt.sign({ username, userId, email, isVssutian, regdNo, events, college, graduationYear, branch, paymentStatus, phone }, process.env.SECRET)

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
const User = require('../../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const nodemailer = require('nodemailer');
const signUp = async (req, res, next) => {
    const { username, email, password, isVssutian, regdNo, college, graduationYear, branch, phone } = req.body
    console.log(req.body)

    try {
        if (!email || !password || !username || isVssutian == null || !college || !graduationYear || !branch || !phone || !regdNo) {
            res.json({
                success: false,
                message: 'All fields must be filled!!!'
            })
        } else {
            const emailExist = await User.findOne({ email });
            let regdExist
            if (regdNo != 1) regdExist = await User.findOne({ regdNo });

            if (emailExist || regdExist) {
                res.json({
                    success: false,
                    message: "Email or registration number already in use"
                })
            } else {

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
                    phone
                })

                user.save().then(async (user) => {
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

                    const token = jwt.sign({ userId, email, isVssutian, regdNo, events, college, graduationYear, branch, paymentStatus, phone }, process.env.SECRET)
                    if (!isVssutian) {
                        const transporter = nodemailer.createTransport({
                            host: "smtp.gmail.com",
                            auth: {
                                user: process.env.EMAIL,
                                pass: process.env.PASSWORD,
                            },
                        });
                        const mailOptions = {
                            from: process.env.EMAIL,
                            to: user.email,
                            subject: 'Complete Payment - FEST VSSUT',
                            html: ``,
                        }
                        // transporter.sendMail(mailOptions).then(())

                    }
                    res.json({
                        token,
                        success: true,
                        message: "Registration successful"
                    })
                }).catch(error => {
                    console.log(error);
                    res.json({
                        success: false,
                        message: "Oops! Error occured while signing up",
                        err: error.message
                    })
                })
            }
        }
    } catch (error) {
        console.log(error);
        res.json({
            message: "Error occured Internally",
            success: false,
            err: error.message
        })
    }

}

module.exports = signUp
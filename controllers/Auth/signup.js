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
                            html: `<html lang="en">
  <head> </head>
  <body>
    <h4>Hello ${user.name}, Thankyou for the registration</h4>
    <h6>follow the next steps to complete the registration process.</h6>
    <ol>
      <li>Pay an amount of INR 499/- to the bank account given below.</li>
      <table>
        <tr>
          <td>Bank</td>
          <td>Canara Bank</td>
        </tr>
        <tr>
          <td>Branch</td>
          <td>Burla ,Odisha , 768017</td>
        </tr>
        <tr>
          <td>Account name</td>
          <td>VPO IDEA CLUB VSSUT BURLA</td>
        </tr>
        <tr>
          <td>Account Number</td>
          <td>80622200011833</td>
        </tr>
        <tr>
          <td>IFSC Code</td>
          <td>CNRB0018062</td>
        </tr>
      </table>
      <li>
        Reply this particular mail with screenshot and the transaction ID of
        your transaction.
      </li>
      <li>
        You are all set this step is on us. we will verify you soon and you can
        take part in any event.
      </li>
    </ol>
    <h5>Note</h5>
    <ul>
      This transaction is done for the fest pass of Samavesh-X-Vassaunt.
    </ul>
    <ul>
      This transactionis done to VSSUT,Burla
    </ul>
    <ul>This transaction is for the accomodation and fest participations for non VSSUT student.</ul>
    <ul>This will not include fooding.</ul>
    <ul>
      In case of any query email on
      <em>fest.vssut@gmail.com</em>
    </ul>
    Thank You, <br>
    Pallav Kumar Patra
  </body>
</html>
`,
                        }
                        transporter.sendMail(mailOptions).then((email) => {
                            res.json({ message: "Registration Successful ! You have been sent an email at " + user.email + " kindly go through and follow the process to get verified." })
                        }).catch(err => {
                            message: "Internal error occured!"
                        })

                    }
                    else {
                        res.json({
                            token,
                            success: true,
                            message: "Registration successful"
                        })

                    }
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
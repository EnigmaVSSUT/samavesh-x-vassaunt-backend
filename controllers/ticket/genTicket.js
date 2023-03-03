const User = require('../../models/user')
const nodemailer = require('nodemailer')

const genTicket = (req, res, next)=>{
    const userId = req.user.userId;

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD,
        },
    });

    User.findById(userId).then(async(user)=>{
        if(user.isVssutian){
            res.json({
                success: true,
                message: "VSSUTians do not require pass for the fest"
            })
        } else{
            if(!user.paymentStatus){
                res.json({
                    success: false,
                    message: "Oops!! It seems like you have not completed the payment process. Check your email for the payment process. If you have completed your payment and facing any issues contact us"
                })
            }
            if(user.paymentStatus && user.ticketGenerated){
                res.json({
                    success: true,
                    message: "The ticket has been sent to your email. Kindly check your email. If you are facing any issue contact us."
                })
            }
            if(user.paymentStatus && !user.ticketGenerated){
                if(user.paymentType === 349){
                    const mailOption = {
                        from: process.env.EMAIL,
                        to: user.email,
                        subject: "Star Night Ticket",
                        html: `
                        <html>
                        <body style="font-family: cursive; width: 650px;margin: 30px 100px;">
                            <div style="display: flex; flex-direction: row;border: 2px solid rgb(0, 0, 0);border-radius: 8px;background-color: white;">
                                <div> 
                                    <img style="width:450px;
                                                height:auto" 
                                     src="https://raw.githubusercontent.com/SamSoham/Demo/main/star.png" alt="">
                                </div>
                               <div>
                                <h2 style="margin-bottom: 25px;color: #4a437e;">Star Night Pass</h2>
                                <p style="font-size: 16px;">${user.username}</p>
                                <p style="font-size: 16px;">${user.college}</p>
                                <p style="font-size: 12px; font-weight: 600;">${user._id}</p>
                               </div>
                            </div>
                        </body>
                        </html>
                        `
                    };

                    await transporter.sendMail(mailOption)
                        .then(()=>{
                            User.findByIdAndUpdate(userId,{ticketGenerated: true})
                                .then(()=>{
                                    res.json({
                                        success: true,
                                        message: "Your ticket for star night has been sent to your email."
                                    })
                                })
                        })
                } else if(user.paymentType === 499){
                    
                        const mailOption = {
                            from: process.env.EMAIL,
                            to: user.email,
                            subject: "Samavesh X Vassaunt Ticket",
                            html: `
                            <html>
                        <body style="font-family: cursive; width: 650px;margin: 30px 100px;">
                            <div style="display: flex; flex-direction: row;border: 2px solid rgb(0, 0, 0);border-radius: 8px;background-color: white;">
                                <div> 
                                    <img style="width:450px;
                                                height:auto" 
                                     src="https://raw.githubusercontent.com/SamSoham/Demo/main/left.png" alt="">
                                </div>
                               <div style="margin-left: 15px;">
                                <h2 style="margin-bottom: 25px;color: #4a437e;">Boarding Pass</h2>
                                <p style="font-size: 16px;">${user.username}</p>
                                <p style="font-size: 16px;">${user.college}</p>
                                <p style="font-size: 12px; font-weight: 600;">${user._id}</p>
                               </div>
                            </div>
                        </body>
                        </html>
                            `
                        };
    
                        await transporter.sendMail(mailOption)
                            .then(()=>{
                                User.findByIdAndUpdate(userId,{ticketGenerated: true})
                                    .then(()=>{
                                        res.json({
                                            success: true,
                                            message: "Your ticket for Samavesh X Vassaunt has been sent to your email."
                                        })
                                    })
                            })
                
            }
        }
        }
    })
    .catch(err =>{
        res.json({
            success: false,
            message: "Something went wrong! Don't worry we are working on it",
            error: err.message
        })
    })
}

module.exports = genTicket
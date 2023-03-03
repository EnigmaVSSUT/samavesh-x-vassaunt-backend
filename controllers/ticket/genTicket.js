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
                        <html lang="en">
                        <head>
                            <meta charset="UTF-8">
                            <meta http-equiv="X-UA-Compatible" content="IE=edge">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            <title>STAR NIGHT PASS</title>
                        </head>
                        <style>
                            @import url("https://fonts.googleapis.com/css2?family=Staatliches&display=swap");
                            @import url("https://fonts.googleapis.com/css2?family=Nanum+Pen+Script&display=swap");
                            
                            * {
                                margin: 0;
                                padding: 0;
                                box-sizing: border-box;
                            }
                            
                            body,
                            html {
                                height: 100vh;
                                display: grid;
                                font-family: "Staatliches", cursive;
                                background: #d83565;
                                color: black;
                                font-size: 14px;
                                letter-spacing: 0.1em;
                            }
                            
                            .ticket {
                                margin: auto;
                                display: flex;
                                background: white;
                                box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
                            }
                            
                            .left {
                                display: flex;
                            }
                            
                            .image {
                                height: 250px;
                                width: 250px;
                                background-image: url("https://github.com/SamSoham/Demo/blob/main/asees1.jpg?raw=true");
                                background-size: cover;
                                background-repeat: no-repeat;
                                opacity: 0.85;
                            }
                            
                            .admit-one {
                                position: absolute;
                                color: darkgray;
                                height: 250px;
                                padding: 0 10px;
                                letter-spacing: 0.15em;
                                display: flex;
                                text-align: center;
                                justify-content: space-around;
                                writing-mode: vertical-rl;
                                transform: rotate(-180deg);
                            }
                            
                            .admit-one span:nth-child(2) {
                                color: white;
                                font-weight: 700;
                            }
                            
                            .left .ticket-number {
                                height: 250px;
                                width: 250px;
                                display: flex;
                                justify-content: flex-end;
                                align-items: flex-end;
                                padding: 5px;
                            }
                            
                            .ticket-info {
                                padding: 10px 30px;
                                display: flex;
                                flex-direction: column;
                                text-align: center;
                                justify-content: space-between;
                                align-items: center;
                            }
                            
                            .date {
                                border-top: 1px solid gray;
                                border-bottom: 1px solid gray;
                                padding: 5px 0;
                                font-weight: 700;
                                display: flex;
                                align-items: center;
                                justify-content: space-around;
                            }
                            
                            .date span {
                                width: 100px;
                            }
                            
                            .date span:first-child {
                                text-align: left;
                            }
                            
                            .date span:last-child {
                                text-align: right;
                            }
                            
                            .date .june-29 {
                                color: #d83565;
                                font-size: 20px;
                            }
                            
                            .show-name {
                                font-size: 32px;
                                font-family: "Nanum Pen Script", cursive;
                                color: #d83565;
                            }
                            
                            .show-name h1 {
                                font-size: 48px;
                                font-weight: 700;
                                letter-spacing: 0.1em;
                                color: #4a437e;
                            }
                            
                            .time {
                                padding: 10px 0;
                                color: #4a437e;
                                text-align: center;
                                display: flex;
                                flex-direction: column;
                                gap: 10px;
                                font-weight: 700;
                            }
                            
                            .time span {
                                font-weight: 400;
                                color: gray;
                            }
                            
                            .left .time {
                                font-size: 16px;
                            }
                            
                            
                            .location {
                                display: flex;
                                justify-content: space-around;
                                align-items: center;
                                width: 100%;
                                padding-top: 8px;
                                border-top: 1px solid gray;
                            }
                            
                            .location .separator {
                                font-size: 20px;
                            }
                            
                            .right {
                                width: 180px;
                                border-left: 1px dashed #404040;
                            }
                            
                            .right .admit-one {
                                color: darkgray;
                            }
                            
                            .right .admit-one span:nth-child(2) {
                                color: gray;
                            }
                            
                            .right .right-info-container {
                                height: 250px;
                                padding: 10px 10px 10px 35px;
                                display: flex;
                                flex-direction: column;
                                justify-content: space-around;
                                align-items: center;
                            }
                            
                            .right .show-name h1 {
                                font-size: 18px;
                            }
                            
                            .barcode {
                                height: 100px;
                            }
                            
                            .barcode :nth-child(1) {
                                color: #d83565;
                            }
                            .barcode :nth-child(3) {
                                color: #4a437e;
                            }
                            
                            .right .ticket-number {
                                color: gray;
                            }
                        </style>
                        <body>
                            <div class="ticket">
                                <div class="left">
                                    <div class="image">
                                        <p class="admit-one">
                                            <span>ADMIT ONE</span>
                                            <span>ADMIT ONE</span>
                                            <span>ADMIT ONE</span>
                                        </p>
                                        
                                    </div>
                                    <div class="ticket-info">
                                        <p class="date">
                                            <span>MONDAY</span>
                                            <span class="june-29">MARCH 6TH</span>
                                            <span>2023</span>
                                        </p>
                                        <div class="show-name">
                                            <h1>Star Night</h1>
                                            <h2>Asees Kaur</h2>
                                        </div>
                                        <div class="time">
                                    
                                            <p>STARTS <span>@</span> 7:00 PM</p>
                                        </div>
                                        <p class="location"><span>Open Air Theatre</span>
                                            <span class="separator"><i class="far fa-smile"></i></span><span>VSSUT, Burla</span>
                                        </p>
                                    </div>
                                </div>
                                <div class="right">
                                    <p class="admit-one">
                                        <span>ADMIT ONE</span>
                                        <span>ADMIT ONE</span>
                                        <span>ADMIT ONE</span>
                                    </p>
                                    <div class="right-info-container">
                                        <div class="show-name">
                                            <h1>Star Night</h1>
                                        </div>
                                        <div class="time">
                                            <p>7:00 PM <span>TO</span> 10:00 PM</p>
                                            <p>DOORS <span>@</span> 6:00 PM</p>
                                        </div>
                                        <div class="barcode">
                                            <p>${user.username}</p>
                                            <p>COLLEGE: ${user.college}</p>
                                            <p>ID:${user._id}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </body>
                        </html>
                        `,
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
                            <html lang="en">
                            <head>
                                <meta charset="UTF-8">
                                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                <title>STAR NIGHT PASS</title>
                            </head>
                            <style>
                                @import url("https://fonts.googleapis.com/css2?family=Staatliches&display=swap");
                                @import url("https://fonts.googleapis.com/css2?family=Nanum+Pen+Script&display=swap");
                                
                                * {
                                    margin: 0;
                                    padding: 0;
                                    box-sizing: border-box;
                                }
                                
                                body,
                                html {
                                    height: 100vh;
                                    display: grid;
                                    font-family: "Staatliches", cursive;
                                    background: #d83565;
                                    color: black;
                                    font-size: 14px;
                                    letter-spacing: 0.1em;
                                }
                                
                                .ticket {
                                    margin: auto;
                                    display: flex;
                                    background: white;
                                    box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
                                }
                                
                                .left {
                                    display: flex;
                                }
                                
                                .image {
                                    height: 250px;
                                    width: 250px;
                                    background-image: url("https://github.com/SamSoham/Demo/blob/main/asees1.jpg?raw=true");
                                    background-size: cover;
                                    background-repeat: no-repeat;
                                    opacity: 0.85;
                                }
                                
                                .admit-one {
                                    position: absolute;
                                    color: darkgray;
                                    height: 250px;
                                    padding: 0 10px;
                                    letter-spacing: 0.15em;
                                    display: flex;
                                    text-align: center;
                                    justify-content: space-around;
                                    writing-mode: vertical-rl;
                                    transform: rotate(-180deg);
                                }
                                
                                .admit-one span:nth-child(2) {
                                    color: white;
                                    font-weight: 700;
                                }
                                
                                .left .ticket-number {
                                    height: 250px;
                                    width: 250px;
                                    display: flex;
                                    justify-content: flex-end;
                                    align-items: flex-end;
                                    padding: 5px;
                                }
                                
                                .ticket-info {
                                    padding: 10px 30px;
                                    display: flex;
                                    flex-direction: column;
                                    text-align: center;
                                    justify-content: space-between;
                                    align-items: center;
                                }
                                
                                .date {
                                    border-top: 1px solid gray;
                                    border-bottom: 1px solid gray;
                                    padding: 5px 0;
                                    font-weight: 700;
                                    display: flex;
                                    align-items: center;
                                    justify-content: space-around;
                                }
                                
                                .date span {
                                    width: 100px;
                                }
                                
                                .date span:first-child {
                                    text-align: left;
                                }
                                
                                .date span:last-child {
                                    text-align: right;
                                }
                                
                                .date .june-29 {
                                    color: #d83565;
                                    font-size: 20px;
                                }
                                
                                .show-name {
                                    font-size: 32px;
                                    font-family: "Nanum Pen Script", cursive;
                                    color: #d83565;
                                }
                                
                                .show-name h1 {
                                    font-size: 48px;
                                    font-weight: 700;
                                    letter-spacing: 0.1em;
                                    color: #4a437e;
                                }
                                
                                .time {
                                    padding: 10px 0;
                                    color: #4a437e;
                                    text-align: center;
                                    display: flex;
                                    flex-direction: column;
                                    gap: 10px;
                                    font-weight: 700;
                                }
                                
                                .time span {
                                    font-weight: 400;
                                    color: gray;
                                }
                                
                                .left .time {
                                    font-size: 16px;
                                }
                                
                                
                                .location {
                                    display: flex;
                                    justify-content: space-around;
                                    align-items: center;
                                    width: 100%;
                                    padding-top: 8px;
                                    border-top: 1px solid gray;
                                }
                                
                                .location .separator {
                                    font-size: 20px;
                                }
                                
                                .right {
                                    width: 180px;
                                    border-left: 1px dashed #404040;
                                }
                                
                                .right .admit-one {
                                    color: darkgray;
                                }
                                
                                .right .admit-one span:nth-child(2) {
                                    color: gray;
                                }
                                
                                .right .right-info-container {
                                    height: 250px;
                                    padding: 10px 10px 10px 35px;
                                    display: flex;
                                    flex-direction: column;
                                    justify-content: space-around;
                                    align-items: center;
                                }
                                
                                .right .show-name h1 {
                                    font-size: 18px;
                                }
                                
                                .barcode {
                                    height: 100px;
                                }
                                
                                .barcode :nth-child(1) {
                                    color: #d83565;
                                }
                                .barcode :nth-child(3) {
                                    color: #4a437e;
                                }
                                
                                .right .ticket-number {
                                    color: gray;
                                }
                            </style>
                            <body>
                                <div class="ticket">
                                    <div class="left">
                                        <div class="image">
                                            <p class="admit-one">
                                                <span>ADMIT ONE</span>
                                                <span>ADMIT ONE</span>
                                                <span>ADMIT ONE</span>
                                            </p>
                                            
                                        </div>
                                        <div class="ticket-info">
                                            <p class="date">
                                                <span>MONDAY</span>
                                                <span class="june-29">MARCH 6TH</span>
                                                <span>2023</span>
                                            </p>
                                            <div class="show-name">
                                                <h1>Star Night</h1>
                                                <h2>Asees Kaur</h2>
                                            </div>
                                            <div class="time">
                                        
                                                <p>STARTS <span>@</span> 7:00 PM</p>
                                            </div>
                                            <p class="location"><span>Open Air Theatre</span>
                                                <span class="separator"><i class="far fa-smile"></i></span><span>VSSUT, Burla</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div class="right">
                                        <p class="admit-one">
                                            <span>ADMIT ONE</span>
                                            <span>ADMIT ONE</span>
                                            <span>ADMIT ONE</span>
                                        </p>
                                        <div class="right-info-container">
                                            <div class="show-name">
                                                <h1>Star Night</h1>
                                            </div>
                                            <div class="time">
                                                <p>7:00 PM <span>TO</span> 10:00 PM</p>
                                                <p>DOORS <span>@</span> 6:00 PM</p>
                                            </div>
                                            <div class="barcode">
                                                <p>${user.username}</p>
                                                <p>COLLEGE: ${user.college}</p>
                                                <p>ID:${user._id}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </body>
                            </html>
                            `,
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
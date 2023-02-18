const nodemailer = require("nodemailer");

const sendOTPVerification = async (req, res, next) => {

  const email = await req.body.email
  // console.log(req.body.email, email)
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  if (email.length > 0) {
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
    const date = new Date()

    const mailOption = {
      from: process.env.EMAIL,
      to: await email,
      subject: "Verify your Email",
      html: `
      <html>
        <body>
          <div
          class="otp"
          style="
            background-color: #ff0000;
            height: fit-content;
            width: fit-content;
            border-radius: 10px;
            color: #ffffff;
            font-size: 20px;
            padding: 20px 50px;
            text-align: center;
            font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
          "
          >
            <div style="display: flex; justify-content: space-between">
              <img
                src="https://raw.githubusercontent.com/EnigmaVSSUT/samavesh-x-vassaunt/main/public/vssutlogo.png"
                alt=""
                style="height: 60px"
              />
              <img
                src="https://raw.githubusercontent.com/EnigmaVSSUT/samavesh-x-vassaunt/kishor/pictures/svlogo.png"
                alt=""
                style="height: 60px"
              />
            </div>
            <h3>YOUR OTP FOR REGISTRATION IS</h3>
            <h1 style="color: black">
              <span
                style="background-color: #ffffff; padding: 5px; border-radius: 5px"
                >${otp}</span
              >
            </h1>
          
            <div style="display: flex; align-items: center; justify-content: space-between; font-size: 12px;">
              <span>${date.getHours() < 10 ? '0' + date.getHours() : date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}:${date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()}</span>
              <span style="display: flex; align-items: center;">
                <a href="https://enigmavssut.com/" target="_blank">
                  <img
                    src="https://raw.githubusercontent.com/EnigmaVSSUT/samavesh-x-vassaunt/kishor/pictures/Enigmalogo.png"
                    alt=""
                    style="height: 30px; position: relateive"
                  />
                </a>
              </span>
            </div>
          </div>
        </body>
      </html>
      `,
    };

    await transporter
      .sendMail(mailOption)
      .then(() => {
        res.json({
          otp: otp,
          message: `Verification OTP sent to ${email}`,
          success: true,
        })
      })
      .catch((error) => {
        res.json({
          err: error.message,
          message: "Error occured internally",
          success: false,
        });

      });
  } else {
    res.json({
      status: "failed",
      message: "Verification OTP is not sent!",
      success: false,
    });
  }
};

module.exports = sendOTPVerification;

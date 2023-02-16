const nodemailer = require("nodemailer");

const sendOTPVerification = async (email, res) => {
  const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  try {
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;

    const mailOption = {
      from: process.env.EMAIL,
      to: await email,
      subject: "Verify your Email",
      html: `<p>Enter <b>${otp}</b> to verify your email for Samavesh X Vassaunt. <b>OTP will expire in 10 minutes.</b></p>`,
    };

    await transporter
      .sendMail(mailOption)
      .then(
        res.json({
          otp,
          message: `Verification OTP sent to ${email}`,
          success: true,
        })
      )
      .catch((error) => {
        res.json({
          err: error.message,
          message: "Error occured internally",
          success: false,
        });
      });
  } catch (error) {
    res.json({
      err: error.message,
      status: "failed",
      message: "Verification OTP is not sent!",
      success: false,
    });
  }
};

module.exports = sendOTPVerification;

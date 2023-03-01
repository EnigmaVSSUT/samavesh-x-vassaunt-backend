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
  <body
    style="
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      width: 100vw;
    "
  >
    <div
      class="otp"
      style="
        background-color: #ed1d24;
        height: 90%;

        width: 100%;
        border-radius: 10px;
        color: #ffffff;
        font-size: 1.5rem;
        padding: 1.5rem 2.5rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        font-family: 'helvetica';
      "
    >
      <div
        style="
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        "
      >
        <img
          src="https://raw.githubusercontent.com/EnigmaVSSUT/samavesh-x-vassaunt/main/public/vssutlogo.png"
          alt=""
          style="height: 100px"
        />

        <img
          src="https://raw.githubusercontent.com/EnigmaVSSUT/samavesh-x-vassaunt/kishor/pictures/svlogo.png"
          alt=""
          height="100px"
        />
      </div>
      <div>
        <h2>YOUR OTP FOR REGISTRATION IS</h2>
        <div
          style="
            color: black;
            background-color: white;
            padding: 0.3rem;
            border-radius: 0.3rem;
            text-align: center;
          "
        >
          <h2
            style="
              background-color: #ffffff;
              padding: 5px;
              border-radius: 5px;
              text-align: center;
            "
          >
            ${otp}
          </h2>
        </div>
      </div>

      <div
        style="
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 12px;
          width: 100%;
        "
      >
        <h3>${date.getHours() < 10 ? '0' + date.getHours() :
          date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() :
            date.getMinutes()}:${date.getSeconds() < 10 ? '0' + date.getSeconds()
              : date.getSeconds()}</h3>
        <span style="display: flex; align-items: center">
          <a href="https://enigmavssut.com/" target="_blank">
            <img
              src="https://raw.githubusercontent.com/EnigmaVSSUT/samavesh-x-vassaunt/kishor/pictures/Enigmalogo.png"
              alt=""
              style="height: 70px"
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

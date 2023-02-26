const nodemailer = require('nodemailer');
const contact = async (req, res, next) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
        },
    });
    const mailOption = {
        from: process.env.EMAIL,
        to: process.env.EMAIL,
        subject: "Query",
        html: `<h2>${req.body.email}</h2> <br></br> <h2>${req.body.name}</h2> <h2>${req.body.number}</h2><h2>${req.body.query}</h2>`
    }
    transporter.sendMail(mailOption).then((mail) => { res.json({ message: "We have received your query , we will get back soon!" }) }).catch((err) => { res.json({ message: "An internal error occured , try again!" }) })

}
module.exports = contact
const Event = require("../../models/events");
const User = require("../../models/user");
const nodemailer = require("nodemailer");

module.exports = async (req, res) => {
    const userId = req.user.userId;
    const eventsArray = await User.findById(userId).select('events -_id')
    if (eventsArray.indexOf(await req.body.eventId) !== -1) {
        return res.json({ message: "You have already Registered for the event!" })
    }

    User.findByIdAndUpdate(userId, { $push: { events: await req.body.eventId } }, { new: true }).then(async (participated) => {

        Event.findByIdAndUpdate(await req.body.eventId, { $push: { participants: userId } }, { new: true }).then(async (event) => {

            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.PASSWORD,
                },
            });

            const mailOption = {
                from: process.env.EMAIL,
                to: participated.email,
                subject: `Successfully registered for the event ${event.eventName}`,
                html: `<p>Hurray!! You have successfully registered for the event ${event.eventName}.<br>See you on <b>day ${event.day}</b> at <b>${event.startTime} Hrs</b> at <b>${event.venue}</b>.</p>`
            }

            await transporter
                .sendMail(mailOption)
                .then(() => {
                    res.json({ Message: `Hurray! you are in for ${event.eventName} see you soon!`, participated, success: true })
                })
        })
    }).catch((err) => {
        console.log(err)
        res.json({ message: "An error occured internally", success: false })

    })


}
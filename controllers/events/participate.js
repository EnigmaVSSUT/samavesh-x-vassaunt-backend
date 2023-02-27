const Event = require("../../models/events");
const User = require("../../models/user");
module.exports = async (req, res) => {
    const userId = req.user.userId;

    User.findByIdAndUpdate(userId, { $push: { events: await req.body.eventId } }, { new: true }).then(async (participated) => {

        Event.findByIdAndUpdate(await req.body.eventId, { $push: { participants: userId } }, { new: true }).then(async (event) => {

            res.json({ Message: `Hurray! you are in for ${event.eventName} see you soon!`, participated, success: true })
        })
    }).catch((err) => {
        console.log(err)
        res.json({ message: "An error occured internally", success: false })

    })


}
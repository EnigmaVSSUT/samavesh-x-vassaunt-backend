const Event = require("../../models/events");
const User = require("../../models/user");
module.exports = async (req, res) => {
    const userId = req.user.userId;

    User.findByIdAndUpdate(userId, { $push: { events: await req.body.eventId } }, { new: true }).then(async (participated) => {

        res.json({ Message: `Hurray! you are in for ${await req.body.eventName} see you soon!`, participated, success: true })
    }).catch((err) => {
        res.json({ message: "An error occured internally", success: false })

    })


}
const Event = require("../../models/events");
const User = require("../../models/user");

module.exports = async (req, res) => {
    const userId = req.user.userId;
 

    User.findByIdAndUpdate(userId, { $addToSet: { events: await req.body.eventId } }, { new: true }).then(async (participated) => {

        Event.findByIdAndUpdate(await req.body.eventId, { $addToSet: { participants: userId } }, { new: true }).then(async (event) => {
            return res.json({ Message: `Hurray! you are in for ${event.eventName} see you soon!`, participated, success: true })
        })
    }).catch((err) => {
        console.log(err)
        res.json({ message: "An error occured internally", success: false })

    })


}

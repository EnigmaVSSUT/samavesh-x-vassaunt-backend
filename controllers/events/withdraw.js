const User = require("../../models/user");
module.exports = async (req, res) => {
    const userId = req.user.userId;

    User.findByIdAndUpdate(userId, { $pull: { events: await req.body.eventId } }, { new: true }).then(async (participated) => {

        res.json({ Message: `Uh oh! groot is sad to see you withdraw from ${await req.body.eventName}!`, participated, success: true })
    }).catch((err) => {
        res.json({ message: "An error occured internally", success: false })

    })


}
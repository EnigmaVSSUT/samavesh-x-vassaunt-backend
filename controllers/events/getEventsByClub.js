const User = require("../../models/user");
const Event = require("../../models/events");

const getEventsByClub = async (req, res, next) => {
    Event.find({ organiser: req.params.club }).then(async (events) => {
        res.json({ message: "Events are ready!", events });

    }).catch((err) => {
        res.json({ message: "Events fetching error" });
    })
}
module.exports = getEventsByClub;
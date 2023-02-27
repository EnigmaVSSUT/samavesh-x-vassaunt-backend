const Event = require("../../models/events");

const getEventsById = async (req, res, next) => {
    Event.find({ _id: req.params.eventId }).then(async (events) => {
        res.json({ message: "Events are ready!", events });

    }).catch((err) => {
        res.json({ message: "Events fetching error" });
    })
}
module.exports = getEventsById;
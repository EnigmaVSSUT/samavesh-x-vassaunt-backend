const Event = require("../../models/events");

const getExpo = async (req, res, next) => {
    Event.find({ eventType: 'exhibition' }).then(async (events) => {
        res.json({ message: "Events are ready!", events });

    }).catch((err) => {
        res.json({ message: "Events fetching error" });
    })
}
module.exports = getExpo;
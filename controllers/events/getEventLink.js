const Event = require("../../models/events")
const getEventLink = async (req, res) => {
    Event.find().select('_id day eventName eventType').then((events) => {

        res.json(events)
    })
}
module.exports = getEventLink;
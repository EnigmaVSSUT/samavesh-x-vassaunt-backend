const User = require("../../models/user");
const Event = require("../../models/events");
const Club = require("../../models/club")
const getEventsByClub = async (req, res, next) => {

    Event.find({ orgId: req.params.club }, (err, events) => {
        if (!err) {
            res.json(events);
        }

    })



}
module.exports = getEventsByClub;
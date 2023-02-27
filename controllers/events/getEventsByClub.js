const User = require("../../models/user");
const Event = require("../../models/events");
const Club = require("../../models/club")
const getEventsByClub = async (req, res, next) => {
    let club;
    let events;
    await Event.find({ organiser: req.params.club }).then((eve) => {
        events = eve
    })
    await Club.find({ name: req.params.club }).then(clu => club = clu)
    res.json({ message: "events fetched", events, club });

}
module.exports = getEventsByClub;
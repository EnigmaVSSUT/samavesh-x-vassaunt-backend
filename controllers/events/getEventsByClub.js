const User = require("../../models/user");
const Event = require("../../models/events");
const Club = require("../../models/club")
const getEventsByClub = async (req, res, next) => {
    let club;
    let events;
    let poc;
    await Event.find({ organiser: req.params.club }).then((eve) => {
        events = eve
    })
    await Club.find({ name: req.params.club }).then((clu) => {
        club = clu
        poc = [{ one: clu.facultyAdvisor, two: clu.facultyAdvisorPhoto, three: clu.facultyAdvisorDepartment }, { one: clu.poc2, two: clu.poc2pic, three: clu.poc2ph }, { one: clu.poc1, two: clu.poc1pic, three: clu.poc1ph }]

    })

    res.json({ message: "events fetched", events, club, poc });

}
module.exports = getEventsByClub;
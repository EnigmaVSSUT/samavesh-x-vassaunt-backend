const User = require("../../models/user");
const Event = require("../../models/events");
const Club = require("../../models/club")
const getEventsByClub = async (req, res, next) => {

    Event.find({ organiser: req.params.club }, (err, events) => {
        if (!err)


            Club.find({ name: req.params.club }).then((club) => {



                res.json({ message: "events fetched", events, club, poc: [{ one: club.facultyAdvisor, two: club.facultyAdvisorPhoto, three: club.facultyAdvisorDepartment }, { one: club.poc2, two: club.poc2pic, three: club.poc2ph }, { one: club.poc1, two: club.poc1pic, three: club.poc1ph }] });
            }).catch((err) => {
                res.json({ message: "Error occured!" })
            });
        else res.json({ messahe: "Error occured!" });

    })



}
module.exports = getEventsByClub;
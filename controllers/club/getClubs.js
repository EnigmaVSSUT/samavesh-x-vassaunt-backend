const Club = require("../../models/club");

const getClubs = async (req, res) => {

    Club.find().then((clubs) => {
        res.json({ message: "Clubs fetched", clubs })
    }).catch(err => res.json({ message: "An internal error occured" }))
}
module.exports = getClubs;
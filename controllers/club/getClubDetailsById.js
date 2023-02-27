const Club = require("../../models/club");

const getClubDetailsById = async (req, res) => {

    Club.find({ _id: req.params.clubId }).then((club) => {
        res.json({ message: "Clubs fetched", club })
    }).catch(err => res.json({ message: "An internal error occured" }))
}
module.exports = getClubDetailsById;
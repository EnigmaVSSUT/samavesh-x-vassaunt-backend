const Club = require("../../models/club");
const mongoose = require('mongoose')
const getClubDetailsById = async (req, res) => {
    // const id = req.params.clubId.toString()
    console.log(req.params.clubId)
    Club.findById(req.params.clubId).then((club) => {
        res.json({ message: "Clubs fetched", club })
    }).catch(err => {
        console.log(err)
        res.json({ message: "An internal error occured" })
    })
}
module.exports = getClubDetailsById;
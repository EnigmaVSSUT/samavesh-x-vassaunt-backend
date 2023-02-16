const Events = require("../../models/events");
const User = require("../../models/user");

const getParticipations = async (req, res, next) => {
  const userId = await req.user.userId;
  User.findById(userId)
    .populate("events", "-participants")
    .then(async (events) => {
      res.json({ message: "Participations fetched!", success: true, events });
    })
    .catch((err) => {
      res.json({ message: "Error occured internally" });
    });
};
module.exports = getParticipations;

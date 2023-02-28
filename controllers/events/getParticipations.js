const Events = require("../../models/events");
const User = require("../../models/user");

const getParticipations = async (req, res, next) => {
  const userId = await req.user.userId;
  User.findById(userId).select('events -_id')
    .populate({
      path: 'events',
      select: '-participants'
    })
    .then(async (events) => {
      res.json({ message: "Participations fetched!", success: true, events: events.events });
      console.log(events)
    })
    .catch((err) => {
      console.log(err)
      res.json({ message: "Error occured internally" });
    });
};
module.exports = getParticipations;

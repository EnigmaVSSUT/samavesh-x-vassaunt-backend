const Event = require('../../models/events');
const getParticipantsForEvents = async (req, res) => {
    Event.findById(req.params.eventId).select('participants -_id').populate({ path: 'participants', select: '-password -events' }).then((response) => {
        res.json(response.participants);
        // console.log(req.params)
    }).catch(err => console.log(err));
}
module.exports = getParticipantsForEvents
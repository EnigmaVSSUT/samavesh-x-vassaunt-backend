const Event = require('../../models/events');
const getParticipantsForEvents = async (req, res) => {
    Event.find({ _id:"63ffa29850fa306e1fddca3c"}).select('participants -_id').populate({ path: 'participants', select: '-password -events' }).then((response) => {
        res.json(response);
    }).catch(err => console.log(err));
}
module.exports = getParticipantsForEvents
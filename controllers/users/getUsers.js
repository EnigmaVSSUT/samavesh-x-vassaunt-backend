const User = require("../../models/user");
const getUser = async (req, res) => {

    User.findOne({ _id: req.user.userId }).then(user => res.json(user)).catch(err => res.json(err))
}
module.exports = getUser
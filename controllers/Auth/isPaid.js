const User = require("../../models/user");
module.exports = async (req, res, next) => {
  User.findById(req.user.userId).then(async (user) => {
    if (user.paymentStatus === True) {
      next();
    } else {
      res.json({
        message: "Oops! seems like you haven't paid for your ticket!",
        success: false,
      });
    }
  });
};

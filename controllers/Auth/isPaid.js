const User = require("../../models/user");
module.exports = async (req, res, next) => {
  User.findById(req.user.userId).then(async (user) => {

    if (user.paymentStatus === True) {
      next();
    } else {
      res.json({
        message: "Oops! seems like you are not yet verified, check your email we sent you while registration to complete verification!",
        success: false,
      });
    }
  });
};

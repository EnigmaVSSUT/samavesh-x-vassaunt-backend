const router = require("express").Router();
const sendOTP = require("../../controllers/Auth/otp");
router.post("/sendOTP", sendOTP);
module.exports = router;

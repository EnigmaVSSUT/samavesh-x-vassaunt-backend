const router = require("express").Router();
const login = require("../../controllers/Auth/login");
const sendOTP = require("../../controllers/Auth/otp");
const signup = require('../../controllers/Auth/signup');
router.post("/sendOTP", sendOTP);
router.post("/signup", signup);
router.post("/login", login);
module.exports = router;

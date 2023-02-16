const router = require('express').Router();
const tokenValidator = require('../../middleware/tokenVerify')
const getEvents = require("../../controllers/events/getEvents");
const participate = require("../../controllers/events/participate")

router.get("/getEvents", getEvents);
router.post("/participate", tokenValidator, participate);

module.exports = router
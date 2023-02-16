const router = require("express").Router();
const tokenValidator = require("../../middleware/tokenVerify");
const getEvents = require("../../controllers/events/getEvents");
const participate = require("../../controllers/events/participate");
const withdraw = require("../../controllers/events/withdraw");
const getParticipations = require("../../controllers/Events/getParticipations");
router.get("/getEvents", getEvents);
router.post("/participate", tokenValidator, participate);
router.post("/withdraw", tokenValidator, withdraw);
router.post("/getParticipations", tokenValidator, getParticipations);

module.exports = router;
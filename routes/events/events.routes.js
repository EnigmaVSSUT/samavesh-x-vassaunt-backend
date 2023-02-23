const router = require("express").Router();
const tokenValidator = require("../../middleware/tokenVerify");
const getEvents = require("../../controllers/events/getEvents");
const participate = require("../../controllers/events/participate");
const withdraw = require("../../controllers/events/withdraw");
const getParticipations = require("../../controllers/events/getParticipations");
const isPaid = require("../../controllers/Auth/isPaid");
router.get("/getEvents", getEvents);
router.put("/participate", tokenValidator, isPaid, participate);
router.put("/withdraw", tokenValidator, withdraw);
router.post("/getParticipations", tokenValidator, getParticipations);

module.exports = router;

const router = require("express").Router();
const tokenValidator = require("../../middleware/tokenVerify");
const getEvents = require("../../controllers/events/getEvents");
const participate = require("../../controllers/events/participate");
const withdraw = require("../../controllers/events/withdraw");
const getParticipations = require("../../controllers/events/getParticipations");
const isPaid = require("../../controllers/Auth/isPaid");
const getEventById = require("../../controllers/events/getEventsById")
const getEventsByClub = require("../../controllers/events/getEventsByClub")
router.get("/getEvents", getEvents);
router.put("/participate", tokenValidator, isPaid, participate);
router.put("/withdraw", tokenValidator, withdraw);
router.get("/getParticipations", tokenValidator, getParticipations);
router.get("/getEventsByClub", getEventsByClub);
router.get("/getEventById", getEventById);
module.exports = router;

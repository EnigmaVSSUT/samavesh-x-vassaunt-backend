const router = require("express").Router();
const tokenValidator = require("../../middleware/tokenVerify");
const getEvents = require("../../controllers/events/getEvents");
const participate = require("../../controllers/events/participate");
const withdraw = require("../../controllers/events/withdraw");
const getParticipations = require("../../controllers/events/getParticipations");
const isPaid = require("../../controllers/Auth/isPaid");
const getEventsById = require("../../controllers/events/getEventsById")
const getEventsByClub = require("../../controllers/events/getEventsByClub")
const getExpo = require("../../controllers/events/getExpo")
router.get("/getEvents", getEvents);
router.put("/participate", tokenValidator, isPaid, participate);
router.put("/withdraw", tokenValidator, withdraw);
router.get("/getParticipations", tokenValidator, getParticipations);
router.get("/getEventsByClub/:club", getEventsByClub);
router.get("/getEventById/:eventId", getEventsById);
router.get("/getExpo", getExpo);
module.exports = router;

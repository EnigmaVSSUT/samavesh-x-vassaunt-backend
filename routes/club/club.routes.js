const router = require('express').Router();

const getClubs = require("../../controllers/club/getClubs")
router.get("/getClubs", getClubs);
module.exports = router
const router = require('express').Router();

const getClubs = require("../../controllers/club/getClubs")
const getClubDetailsById = require("../../controllers/club/getClubDetailsById")
router.get("/getClubs", getClubs);
router.get('/getClubDetailsById/:clubId', getClubDetailsById)
module.exports = router
const router = require('express').Router()

const getUser = require("../../controllers/users/getUsers");
const tokenVerify = require("../../middleware/tokenVerify")
router.get("/getUser", tokenVerify, getUser);
module.exports = router
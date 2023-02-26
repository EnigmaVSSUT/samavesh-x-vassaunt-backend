const router = require("express").Router()
const contact = require("../../controllers/contact/contact");

router.post("/contactUs", contact);
module.exports = router
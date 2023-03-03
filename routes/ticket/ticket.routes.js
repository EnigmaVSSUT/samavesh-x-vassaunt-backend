const router = require('express').Router()
const tokenVerification = require('../../middleware/tokenVerify')
const genTicket = require('../../controllers/ticket/genTicket')

router.get('/genTicket', tokenVerification, genTicket)

module.exports = router
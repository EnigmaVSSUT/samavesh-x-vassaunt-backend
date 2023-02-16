const router = require('express').Router()
const makePayment = require('../../controllers/payment/payment')
const tokenVerfication = require('../../middleware/tokenVerify')

router.post('/payment', makePayment)

module.exports = router
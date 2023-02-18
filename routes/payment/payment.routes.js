const router = require('express').Router()
const makePayment = require('../../controllers/payment/makePayment')
const getPayment = require('../../controllers/payment/getPayments')
const tokenVerification = require('../../middleware/tokenVerify')

router.post('/makepayment', tokenVerification, makePayment)
router.post('/getpayment', tokenVerification, getPayment)

module.exports = router
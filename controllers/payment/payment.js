const sdk = require('api')('@cashfreedocs-new/v3#he81m7ldwtny5h');
const User = require('../../models/user')

const makePayment = (req, res, next)=>{
    const userId = req.body.userId
    User.findById(userId).then((user)=>{
        // console.log(user)
        // console.log(user.email, user.phone)
        sdk.createPaymentLink({
          customer_details: {
            customer_name: `${user.username}`,
            customer_phone: `${user.phone}`,
            customer_email: `${user.email}`
        },
          link_notify: {send_sms: false, send_email: false},
          link_notes: {userId: userId},
          link_meta: {
            upi_intent: true,
        },
          link_id: `${user._id}`,
          link_amount: 1000,
          link_currency: 'INR',
          link_purpose: 'Payment Samavesh X Vassaunt Ticket',
          link_partial_payments: false,
          link_auto_reminders: false,
          link_expiry_time: '2023-03-14T15:04:05+05:30'
        }, {
          'x-client-id': '32104964618f222ca9b7ed4b17940123',
          'x-client-secret': 'ee71924aec8417ab39de66274086488daa5ceacd',
          'x-api-version': '2022-09-01'
        })
          .then(({ data }) => res.json(data))
          .catch(err => res.json(err));
        // res.json({user})
    })
}

module.exports = makePayment

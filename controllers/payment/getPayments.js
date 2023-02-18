const sdk = require('api')('@cashfreedocs-new/v3#he81m7ldwtny5h');
const User = require('../../models/user')

const getPayment = (req, res, next)=>{
    const userId = req.user.userId
    // console.log(req.user)
    User.findById(userId).then((user)=>{
        // console.log(user)
        // console.log(user.email, user.phone)
        sdk.server('https://sandbox.cashfree.com/pg');
        sdk.getPaymentLinkDetails({
          link_id: userId,
          'x-client-id': '32104964618f222ca9b7ed4b17940123',
          'x-client-secret': 'ee71924aec8417ab39de66274086488daa5ceacd',
          'x-api-version': '2022-09-01'
        })
          .then(({ data }) => res.json(data))
          .catch(err => res.json(err));
        
    })
}

module.exports = getPayment


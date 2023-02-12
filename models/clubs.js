const mongoose = require('mongoose')
const Schema = mongoose.Schema

const clubSchema = new Schema({
    clubName: {
        type: String
    },
    description: {
        type: String
    },
    poC:[
        {
            name:{
                type: String
            },
            designation: {
                type: String
            },
            contact:{
                type: String
            }
        }
    ]
})

module.exports = mongoose.model('clubs', clubSchema)
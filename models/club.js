const mongoose = require('mongoose');

const clubSchema = new mongoose.Schema({
    name: String,
    email: String,
    description: String,
    logo: String,
    facultyAdvisor: String,
    facultyAdvisorDepartment: String,
    facultyAdvisorPhoto: String,
    poc1: String,
    poc1ph: String,
    poc1pic: String,
    poc2: String,
    poc2ph: String,
    poc2pic: String,
})
module.exports = mongoose.model("Club", clubSchema);
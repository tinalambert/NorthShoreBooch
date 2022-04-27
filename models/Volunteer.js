const mongoose = require('mongoose')
const { Schema } = require('mongoose'); 

const volunteerSchema = Schema({

    firstName: String,
    lastName: String,
    email: String,
    phoneNumber: Number,
    task: String

})


module.exports = mongoose.model('Volunteer', volunteerSchema); 
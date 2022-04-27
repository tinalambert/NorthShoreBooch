const mongoose = require('mongoose')
const { Schema } = require('mongoose'); 

const volunteerSchema = Schema({

    username: String,
    task: String,
    location: String,
    availability: Date 

})


module.exports = mongoose.model('Volunteer', volunteerSchema); 
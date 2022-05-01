const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const eventSchema = Schema({
    event: {
        type: String,
        required: [true, "Event name required!"],
        trim: true,
    }, 
    date: {
        type: String,
        required: [true, "Date required!"],
        trim: true,
    },
    description: {
        type: String,
        required: [true, "Description required!"], 
        trim: true,
    }, 
    imageUrl: String, 
})

module.exports =mongoose.model('Event', eventSchema);
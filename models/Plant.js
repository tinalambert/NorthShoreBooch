const mongoose = require('mongoose');
const { Schema } = require('mongoose');


const plantSchema = Schema({

    type: String,
    name: String, 
    description: String  
      
})

module.exports = mongoose.model('Plant', plantSchema);
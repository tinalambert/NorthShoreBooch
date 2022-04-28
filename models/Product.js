const mongoose = require('mongoose');
const { Schema } = require('mongoose'); 

const productSchema = Schema({  
    productName: String,
    image: String, 
    description: String,
    productPrice: String,
    // seasonality: String
})

module.exports = mongoose.model('Product', productSchema);
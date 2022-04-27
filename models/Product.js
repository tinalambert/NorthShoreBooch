const mongoose = require('mongoose');
const { Schema } = require('mongoose'); 

const productSchema = Schema({
    
    name: String,
    image: String, 
    description: String,
    price: Number,
    seasonality: String,
    reviews: String
})


module.exports = mongoose.model('Product', productSchema);
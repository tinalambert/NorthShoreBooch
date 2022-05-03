const mongoose = require('mongoose');
const { Schema } = require('mongoose'); 

const productSchema = Schema({  
    productName: String,
    image: String, 
    description: String,
    productPrice: String,
    userId: { type: Schema.Types.ObjectId, ref: "User" }
    // seasonality: String
})

module.exports = mongoose.model('Product', productSchema);
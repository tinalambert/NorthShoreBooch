const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const User = require("../models/User");
const Product = require("../models/Product");

const cartSchema = Schema({  
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    products: [{ type: Schema.Types.ObjectId, ref: "Product" }]
})

module.exports = mongoose.model('Cart', cartSchema);
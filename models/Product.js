const mongoose = require('mongoose');
const { Schema } = require('mongoose'); 

const productSchema = Schema({  
    productName: String,
    imageUrl: {
        type: String,
        required: [true, "Image URL is required!"],
        validate: {
           validator: (imageUrl) => {
              const regex = /^https?:\/\//
              const match = regex.test(imageUrl)
              return match
           },
           message: "Image URL must be a valid http or https link"
        },
     }, 
     description: {
        type: String,
        required: [true, "Please describe your product"],
     },
    productPrice: {
        type: String,
        required: [true, "Price is required"],
        validate: {
            validator: (productPrice) => {
                const regex = /^\$[0-9]+(\.[0-9][0-9])?$/
                const match = regex.test(productPrice)
                return match
            },
            message: "Price must be in the format of $0.00"
        },    
    },
    userId: { type: Schema.Types.ObjectId, ref: "User" }
    // seasonality: String
})

module.exports = mongoose.model('Product', productSchema);
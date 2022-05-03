const mongoose = require('mongoose');
const { Schema } = require('mongoose');
<<<<<<< HEAD
const passportLocalmongoose = require('passport-local-mongoose');
=======
const Product = require('../models/Product')
>>>>>>> main

const userSchema = Schema({
  firstName: String,
  lastName: String,
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: String,
  password: String,

  cart: {
    items: [{ productId: {type: Schema.Types.ObjectId, ref: "Product" }}]
  }   
});

<<<<<<< HEAD
userSchema.plugin(passportLocalmongoose);
=======
userSchema.methods.addToCart = function(product){
  const cartItems = [...this.cart.items];
  let count = 0;

    if (cartItems.includes(product.productId)) {
      console.log("This item is already in your cart")
    } else {
      cartItems.push({ productId : product._id});
    }
   
  console.log("items saved, check your db")
  const updatedCart = { items : cartItems };

  cartItems.forEach(item => {
    count++
  })

  console.log("count is ", count)

  this.cart =  updatedCart;
  return this.save()
}
>>>>>>> main

module.exports = mongoose.model('User', userSchema);




// MIGHT NEED THE BELOW FOR FUTURE ADDING/DELETING

// const cartProductIndex  = this.cart.items.findIndex(cp=>{
  //   console.log("cp product is ", cp)
  //     return cp._id.toString() === product._id.toString();
  // });
  // let newQuantity = 1;
  // const cartItems = [...this.cart.items];

// if(cartProductIndex>=0){
  //     //then product already exists
  //     newQuantity = this.cart.items[cartProductIndex].quantity + 1;
  //     cartItems[cartProductIndex].quantity = newQuantity;
  // }else{
    // cartItems.push({ productId : product._id});
     // }
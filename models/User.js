const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const passportLocalmongoose = require('passport-local-mongoose');
const Product = require('../models/Product');

const userSchema = Schema({
  firstName: String,
  lastName: String,
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    validate: {
      validator: (email) => {
        const regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
        const match = regex.test(email)
        return match
      },
      message: "Please enter a valid email address"
    },
  },
  password: {
    type: String,
    validate: {
      validator: (password) => {
        const regex = /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/
        const match = regex.test(password)
        return match
      },
      message: "Passwords must be min 8 chars * Have one number & special character * Include one upper and lower case letter",
    },
  }, 

  cart: {
    items: [
      {
        productId: { type: Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number },
      },
    ],
  },
  isAdmin: { type: Boolean, default: false },
  isVolunteer: { type: Boolean, default: false},
  avatar: String,
  phoneNumber: String,
  streetAddress: String,
  postalCode: String,
  city: String,
  state: String,
  country: String,
  events: [{type: Schema.Types.ObjectId, ref: 'Event'}] 
});

userSchema.plugin(passportLocalmongoose);

userSchema.methods.addToCart = async function (product) {
  // const count = 0;

  const cartProductIndex = this.cart.items.findIndex((cart) => {
    // console.log("cart product is ", cart);
    return cart.productId.toString() === product._id.toString();
  });
  let newQuantity = 1;
  const cartItems = [...this.cart.items];

  if (cartProductIndex >= 0) {
    console.log('This product already exists');
    newQuantity = this.cart.items[cartProductIndex].quantity + 1;
    cartItems[cartProductIndex].quantity = newQuantity;
  } else {
    cartItems.push({ productId: product._id });
  }

  const updatedCart = { items: cartItems };

  // cartItems.forEach((item) => {
  //   count++;
  // });

  // console.log("count is ", count);

  this.cart = updatedCart;
  return this.save();
};

userSchema.methods.deleteItemFromCart = function (product) {
  const updatedCartItems = this.cart.items.filter((cart) => {
    // console.log(12345, cart.productId)
    // console.log(8888888, cart._id)
    return cart._id.toString() !== product;
  });
  this.cart.items = updatedCartItems;
  // console.log("updated cart items are ", updatedCartItems)
  return this.save();
};
// userSchema.methods.clearCart = function(){
//   this.cart = {items : []};
//   return this.save();
// }

module.exports = mongoose.model('User', userSchema);

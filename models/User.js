const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const passportLocalmongoose = require("passport-local-mongoose");
const Product = require("../models/Product");

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
    items: [
      {
        productId: { type: Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number },
      },
    ],
  },
  isAdmin: { type: Boolean, default: false },
  avatar: String,
  phoneNumber: String,
  streetAddress: String,
  postalCode: String,
  city: String,
  state: String,
  country: String,
});

userSchema.plugin(passportLocalmongoose);
userSchema.methods.addToCart = async function (product) {
  let count = 0;

  const cartProductIndex = this.cart.items.findIndex((cart) => {
    console.log("cart product is ", cart);
    return cart.productId.toString() === product._id.toString();
  });
  let newQuantity = 1;
  const cartItems = [...this.cart.items];

  if (cartProductIndex >= 0) {
    console.log("This product already exists");
    newQuantity = this.cart.items[cartProductIndex].quantity + 1;
    cartItems[cartProductIndex].quantity = newQuantity;
  } else {
    cartItems.push({ productId: product._id });
  }

  const updatedCart = { items: cartItems };

  cartItems.forEach((item) => {
    count++;
  });

  console.log("count is ", count);

  this.cart = updatedCart;
  return this.save();
};

module.exports = mongoose.model("User", userSchema);
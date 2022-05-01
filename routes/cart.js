const express = require('express');
const req = require('express/lib/request');
const router = express.Router();
const Cart = require('../models/Cart');
const User = require("../models/User");
const Product = require("../models/Product");
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;
const assignJWT = require("../middleware/assignJWT");

router.get('/', async (req, res) => {

    let cart;
    cart = await Cart.findById(req.params.id);
    let products = [];
    products = await Product.find();

    let token = req.cookies.token
  console.log("TOKEN IS ", token)
  let secret = process.env.JWT_SECRET;

  let loggedIn = req.loggedIn
  // let decoded = jwt.verify(token, secret, {complete:true})

  // console.log("verified id is...", verified.payload.id)

    // let user = User.find()
    

    res.render("cart", {token})
});
    
router.post("/", async (req, res) => {
        let userId = req.params.id;
        console.log("User ID is ", userId)
        let cartId = req.body.cart;
        let carts = await Cart.find();
        let user = await User.findById(userId);
        let cartSpecific = await Cart.findById(cartId);
        
        if (user.carts.includes(req.body.cartSpecific)) {
            let user = await User.findById(userId).populate("carts")
            return res.render("addToCart", {
                title: "Add to Cart",
                user,
                cart,
                loggedIn,
                message: "This item is already in your cart. View cart to increase quantity."
            })
        }
        await cartSpecific.save((err) => {
            if (err) {
                console.log(err);
            } else {
                Cart.findByIdAndUpdate(cartId, {
                    $push: { user: userId },
                }).exec();
                User.findByIdAndUpdate(userId, {
                    $push: { carts: cartId },
                }).exec();
                console.log("Cart Saved, check your db");
            }
    });
    res.redirect("/");
})

// res.render("cart", { user: user, cart: cart });

module.exports = router
const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const User = require("../models/User");
const Product = require("../models/Product");
const cartController = require("../controllers/cartController");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;
const assignJWT = require("../middleware/assignJWT");

router.get("/", async (req, res, next) => {
  res.render("cart");
});

router.post("/:id", cartController.postCart)

// router.post("/:id", async (req, res) => {
//   const productId = req.params.id;
//   let token = req.cookies.loggedIn;
//   let secret = process.env.JWT_SECRET;
//   let decoded = jwt.verify(token, secret, { complete: true });
//   let userId = decoded.payload.id;
//   console.log("USER ID IS ", userId);

//   const user = await User.findById(userId);
//   console.log(user);

//   const product = await Product.findById(productId);
//   console.log(product);

//   Product.findById(productId)
//     .then((product) => {
//       console.log("add to cart product is ", product);

//       // Gets Userschema method from User Model
//       return user.addToCart(product);
//     })
//     .then((result) => {
//       console.log(result);
//       res.redirect("/products");
//     });
// });

// exports.postCartDeleteProduct = (req, res, next) => {
//   const productId = req.params.id;
//   req.user //always request a user first
//     .deleteItemFromCart(productId)
//     .then((result) => {
//       res.redirect("/cart");
//     })

//     .catch((err) => {
//       console.log(err);
//     });
// };
// exports.postOrder = (req, res, next) => {
//   req.user
//     .populate("cart.items.productId")
//     .execPopulate()
//     .then((user) => {
//       console.log(user.cart.items);

//       const products = user.cart.items.map((i) => {
//         return { quantity: i.quantity, product: { ...i.productId._doc } };
//       });

//       const order = new Cart({
//         products: products,
//         user: {
//           name: req.user.name,
//           userId: req.user,
//         },
//       });

//       return order.save();
//     })
//     .then((result) => {
//       return req.user.clearCart();
//     })
//     .then((result) => {
//       res.redirect("/orders");
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

module.exports = router;

//     const productId = req.params.id
//     let token = req.cookies.loggedIn
//     let secret = process.env.JWT_SECRET;
//     let decoded = jwt.verify(token, secret, {complete:true})
//     let userId = decoded.payload.id
//     console.log("USER ID IS ", userId)

//     const product = await Product.findById(productId);
//     console.log(product)

// // try {
// //     let cart = Cart ({
// //         userId: userId,
// //         products: []
// //     });
// //     cart.save();
// //     console.log("Item was added to cart, check your db")

// // } catch (error) {
// //     console.log(error)
// // }
// //     res.redirect("/products")

//     // let cart = await Cart.find()
//     // let cartId = cart[0]._id.valueOf()

// //    try {
// //        Cart.findByIdAndUpdate(cartId, {
// //            $push: {products: productId}
// //        }).exec()
// //        console.log("Item was added to cart, check your db")
// //    } catch (error) {
// //        console.log(error)
// //    }
// //    res.redirect("/products")
// });

// res.render("cart", { user: user, cart: cart });

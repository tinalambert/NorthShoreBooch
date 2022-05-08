const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Product = require("../models/Product");
const cartController = require("../controllers/cartController");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;
const assignJWT = require("../middleware/assignJWT");

// router.get("/", async (req, res, next) => {
//   let products = [];
//   products = await Product.find()

//   res.render("cart", {title: "Gettin' Boochy", products})
// });

router.get("/", cartController.getCart)

router.post("/:id", cartController.postCart)

router.post("/delete/:id", cartController.postCartDeleteProduct)


module.exports = router;






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
    // });
// };
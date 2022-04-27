const express = require('express')
const router = express.Router();

router.get('/', (req, res) => {
    res.render("cart", {title: "Cart"})
})

module.exports = router
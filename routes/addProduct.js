let express = require("express");
let router = express.Router();

router.get("/", (req, res) => {
   res.render("addProduct", {title: "Add Product"})
})

module.exports = router;
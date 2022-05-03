const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Event = require('../models/Event');

router.get('/', async (req, res) => {
    console.log('the search is: ' + req.query.search)

    const productName = req.query.search
    const eventName = req.query.search

    let products = [];
    let events = [];

    if(!productName || !eventName) {
        console.log(1)
        return res.render('searchResults', {message: "No results found!"})
    }
    if(productName || eventName) {
        products = await Product.find({productName: {$regex: productName, $options: 'i'}}).exec(); 
        events = await Event.find({event: {$regex: eventName, $options: 'i'}}).exec(); 
    
        return res.render('searchResults', {products, events})
    }
        console.log(5)
        res.redirect('/'); 
});

module.exports = router; 
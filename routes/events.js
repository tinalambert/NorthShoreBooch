const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
    console.log('events is firing.')
    res.render('events', {title: "EventsPage"}); 
})


module.exports = router; 

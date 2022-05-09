
const express = require('express');
const router = express.Router();
const Article = require('../models/Article');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

router.get('/', async (req, res) => {
    let token;
    let decoded;
    let isAdmin;
    let loggedIn = false;

    if(req.cookies.loggedIn) {
        loggedIn = true;
        token = req.cookies.loggedIn;
        decoded = jwt.verify(token, secret, {complete: true});
        isAdmin = decoded.payload.isAdmin
    }
    const articles = await Article.find({}).lean();

    res.render('hollistic', {articles, loggedIn, isAdmin});;  
}); 

router.post('/', async (req,res) => {
    const { title, author, description, link, imageUrl } = req.body;

    const newArticle = new Article({
        title: title,
        author: author,
        description: description,
        link: link,
        imageUrl: imageUrl,
    });

    await newArticle.save((err) => {
      if(err) {
        const error = newArticle.validateSync().errors;
        if(error.title) {
            res.render('hollistic', {message: error.title.message});
        }
        if(error.author) {
            res.render('hollistic', {message: error.author.message});
        }
        if(error.description) {
            res.render('hollistic', {message: error.description.message});
        }
    } else {
            console.log('New Article saved!');
            res.redirect('hollistic');
        }         
    });
});

module.exports = router; 
const express = require('express');
const router = express.Router();
const Article = require('../models/Article');

router.get('/', async (req, res) => {
    const articles = await Article.find({}).lean();

    res.render('hollistic', {articles}); 
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
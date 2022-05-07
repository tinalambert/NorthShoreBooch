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

router.get('/update/:id', async (req, res) => {

    const article = await Article.findById(req.params.id)
    
    res.render('updateArticle', {title: "Update Article", article})
});

router.post('/update/:id', async (req, res) => {

    const articleId = req.params.id
    const article = await Article.findById(articleId, req.body).exec()
    
    await article.save((err) => {
        if(err) {
            console.log(err)
        } else {
        Article.findByIdAndUpdate(articleId, article).exec()
        console.log("Article successfully updated, check DB!")
        res.redirect('/hollistic')    
        }
    })
});

router.get('/delete/:id', async (req, res) => {
    
    const articleId = req.params.id;
    const article = await Article.findById(articleId);

    res.render('deleteArticle', {title: "Delete Article", article}); 
});

router.post('/delete/:id', async (req, res) => {

    const articleId = req.params.id;
    const article = await Article.findByIdAndDelete(articleId);

    res.redirect('/hollistic'); 
})

module.exports = router; 
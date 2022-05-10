
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

    articles.forEach((article) => {
      article.isAdmin = isAdmin;
    })
    //console.log(articles)

    res.render('holistic', {articles, loggedIn, isAdmin});  
}); 

router.post('/', async (req,res) => {
  console.log(11111111111, req.body)
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
            res.render('holistic', {message: error.title.message});
        }
        if(error.author) {
            res.render('holistic', {message: error.author.message});
        }
        if(error.description) {
            res.render('holistic', {message: error.description.message});
        }
    } else {
            console.log('New Article saved!');
            res.redirect('holistic');
        }         
    });
});

router.get('/update/:id', async (req, res) => {
    const article = await Article.findById(req.params.id)
  
    res.render('updateArticle', {title: "Update article", article})
  })
  
  router.post('/update/:id', async(req, res) => {
    const articleId = req.params.id;
    const article = await Article.findById(articleId, req.body).exec()
  
    await article.save((err) => {
      if(err) {
        console.log(err)
      } else {
        Article.findByIdAndUpdate(articleId, article).exec()
        console.log("Event successfully updated, check your DB!")
        res.redirect('/holistic'); 
      }
    })
  })
  
  router.get('/delete/:id', async(req,res) => {
    const article = await Article.findById(req.params.id);
  
    res.render('deleteArticle', {title:"Delete Event", article})
  })
  
  router.post('/delete/:id', async(req, res) => {
    const articleId = req.params.id;
    const article = await Article.findByIdAndDelete(articleId);
  
    res.redirect('/holistic')
  })

module.exports = router; 
const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const articleSchema = Schema({
    title: {
        type: String, 
        required: [true, "Title required!"],
        trim: true
    },
    author: {
        type: String,
        required: [true, "Author required!"],
        trim: true, 
    },
    description: {
        type: String,
        required: [true, "Description required!"],
        trim: true,
    },
    link: {
        type: String, 
        trim: true,
    },
    imageUrl: String, 
})

module.exports = mongoose.model('Article', articleSchema); 
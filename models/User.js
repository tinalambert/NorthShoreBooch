const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const userSchema = Schema({

  firstname: String,
  lastname: String,
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: String,
  password: String,
  
});

module.exports = mongoose.model('User', userSchema);

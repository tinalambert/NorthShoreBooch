const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const userSchema = Schema({
  firstName: String,
  lastName: String,
  userName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: String,
  password: String,
});

module.exports = mongoose.model('User', userSchema);

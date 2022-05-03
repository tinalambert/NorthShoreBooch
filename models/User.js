const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const passportLocalmongoose = require('passport-local-mongoose');

const userSchema = Schema({
  firstName: String,
  lastName: String,
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: String,
  password: String,
});

userSchema.plugin(passportLocalmongoose);

module.exports = mongoose.model('User', userSchema);

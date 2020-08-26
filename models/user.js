const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    unique: true,
    type: String,
    required: true,
  },
  phone: {
    unique: true,
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('User', userSchema);
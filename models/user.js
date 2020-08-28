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
  street: {
    type: String,
  },
  house: {
    type: String,
  },
  flat: {
    type: String,
  },
})

module.exports = mongoose.model('User', userSchema);

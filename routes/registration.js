const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Courier = require('../models/courier');

// render pages for couriers

router.get('/courier', (req, res) => {
  console.log('courier registration');
  res.render('courier/registration')
})


router.post('/courier', async (req, res) => {
  const { name, email, phone, password } = req.body;
  const courier = await new Courier({
    name,
    email,
    phone,
    password,
  })
  courier.save();
  req.session.courier = courier;
  console.log('courier register db');
  res.redirect('/courier/main');
})


// render pages for users

router.get('/user', (req, res) => {
  console.log('user registration');
  res.render('user/registration')
})

router.post('/user', async (req, res) => {
  const { name, email, phone, password } = req.body;
  const user = await new User({
    name,
    email,
    phone,
    password,
  })
  user.save();
  req.session.user = user;
  console.log('registrsation user db');
  res.redirect('/user/main');
})


module.exports = router;

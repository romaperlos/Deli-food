const express = require('express');
const router = express.Router();
const sha256 = require('sha256');
const User = require('../models/user');
const Courier = require('../models/courier');

// render pages for couriers

router.get('/courier', (req, res) => {
  console.log('courier registration');
  res.render('courier/registration');
})


router.post('/courier', async (req, res) => {
  const { name, email, phone } = req.body;
  const password = sha256(req.body.password);
  const passwordRepeat = sha256(req.body.passwordRepeat);
  if (password == passwordRepeat) {
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
  } else {
    res.render('courier/registration', { invalidPassword: true })
  }
})


// render pages for users

router.get('/user', (req, res) => {
  console.log('user registration');
  res.render('user/registration')
})

router.post('/user', async (req, res) => {
  const { name, email, phone } = req.body;
  const password = sha256(req.body.password);
  const passwordRepeat = sha256(req.body.passwordRepeat);
  if (password == passwordRepeat) {
    console.log(password);
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
  } else {
    res.render('user/registration', { invalidPassword: true })
  }
})


module.exports = router;

const express = require('express');
const router = express.Router();
const sha256 = require('sha256');
const User = require('../models/user');
const Courier = require('../models/courier');

// login user

router.get('/user', (req, res) => {
  console.log('user login page');
  res.render('user/login')
});

router.post('/user', async (req, res) => {
  const { email } = req.body;
  const password = sha256(req.body.password);
  console.log(password);
  const user = await User.findOne({ email });
  console.log('user login');
  if (user) {
    console.log(password);
    console.log(user.password);
    if (user.password == password) {
      req.session.user = user;
      console.log('ok');
      res.redirect('/user/main');
    } else {
      console.log('no pass');
      res.render('user/login');
    }
  } else {
    console.log('no user');
    res.render('user/login')
  }
});

// login courier

router.get('/courier', (req, res) => {
  console.log('courier login page');
  res.render('courier/login')
});

router.post('/courier', async (req, res) => {
  const { email } = req.body;
  const password = sha256(req.body.password);
  const courier = await Courier.findOne({ email });
  console.log('courier login');
  if (courier) {
    if (courier.password == password) {
      req.session.courier = courier;
      res.redirect('/courier/main');
    } else {
      res.render('courier/login');
    }
  } else {
    res.render('courier/login');
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const User = require('../models/user.js');
const checkAuthSession = require('../auth/auth');

router.get('/main', checkAuthSession, (req, res) => {
  console.log('user main');
  res.render('user/main', { layout: 'navbar.hbs' });
});

router.get('/search', checkAuthSession, (req, res) => {
  res.send('search page user');
});

router.get('/order', checkAuthSession, (req, res) => {
  res.send('order page user');
});

router.get('history', checkAuthSession, (req, res) => {
  res.send('history page user');
});

module.exports = router;

const express = require("express");
const router = express.Router();
const User = require('../models/user.js');
const checkAuthSession = require('../auth/auth');

router.get('/main', checkAuthSession, (req, res) => {
  console.log('user main');
  res.render('user/main', { layout: 'navbar.hbs' });
});

router.get('/search', checkAuthSession, (req, res) => {
  res.render('user/search', { layout: 'navbar.hbs' });
});

router.get('/order', checkAuthSession, (req, res) => {
  res.render('user/order', { layout: 'navbar.hbs' });
});

router.get('history', checkAuthSession, (req, res) => {
  res.render('user/history', { layout: 'navbar.hbs' });
});

module.exports = router;

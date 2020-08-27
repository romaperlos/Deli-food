const express = require("express");
const router = express.Router();
const Courier = require('../models/courier.js');
const checkAuthSession = require('../auth/auth');

router.get('/main', checkAuthSession, (req, res) => {
  console.log('courier main');
  res.render('courier/main', { layout: 'navbar.hbs' });
});

router.get('/search', checkAuthSession, (req, res) => {
  res.render('courier/search');
});

router.get('/order', checkAuthSession, (req, res) => {
  res.send('order page courier');
});

router.get('history', checkAuthSession, (req, res) => {
  res.send('history page courier');
});

module.exports = router;

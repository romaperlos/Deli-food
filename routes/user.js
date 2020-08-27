const express = require("express");
const router = express.Router();
const User = require('../models/user.js');

router.get('/main', (req, res) => {
  console.log('user main');
  res.render('user/main');
});

module.exports = router;

const express = require("express");
const router = express.Router();
const Courier = require('../models/courier.js');

router.get('/main', (req, res) => {
  console.log('courier main');
  res.render('courier/main');
});

// router.post()

module.exports = router;

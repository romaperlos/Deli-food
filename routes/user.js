const express = require("express");
const router = express.Router();
const User = require('../models/user');
const UserOrder = require('../models/userOrder');
const CourierOrder = require('../models/courierOrder');
const checkAuthSession = require('../auth/auth');

router.get('/main', (req, res) => {
  res.render('user/main', { layout: 'navbar.hbs', user: true })
})

router.post('/main', checkAuthSession, async (req, res) => {
  const { street, house, flat } = req.body;
  const userOrders = await new UserOrder({
    street,
    house,
    flat,
  });
  userOrders.save();
  console.log(userOrders);
  res.redirect('/user/search');
});

router.get('/search', checkAuthSession, async (req, res) => {
  const courierOrders = await CourierOrder.find();
  let flag = false;
  if (courierOrders.length == 0) {
    flag = true;
  }
  res.render('user/search', { layout: 'navbar.hbs', courierOrders, flag, user: true });
});

router.get('/order', checkAuthSession, (req, res) => {
  res.render('user/order', { layout: 'navbar.hbs', user: true });
});

router.get('/history', checkAuthSession, (req, res) => {
  res.render('user/history', { layout: 'navbar.hbs', user: true });
});

router.get('/logout', async (req, res) => {
  await req.session.destroy()
  res.redirect('/')
})

module.exports = router;

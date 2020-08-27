const express = require("express");
const router = express.Router();
const Courier = require('../models/courier.js');
const CourierOrder = require('../models/courierOrder');
const checkAuthSession = require('../auth/auth');

router.get('/main', checkAuthSession, (req, res) => {
  console.log('courier main');
  res.render('courier/main', { layout: 'navbar.hbs', courier: true });
});

router.get('/search', checkAuthSession, (req, res) => {
  res.render('courier/search', { layout: 'navbar.hbs', courier: true });
});

router.post('/search', checkAuthSession, async (req, res) => {
  const { cafe, basket, address, oldPrice,sales} = req.body;
  const courierOrders = await new CourierOrder({
    cafe,
    basket,
    address,
    sales,
    oldPrice,
    newPrice: oldPrice - (oldPrice / 100 * sales),
  });
  courierOrders.save();
  console.log(courierOrders);
  res.redirect('/courier/search');
})

router.get('/order', checkAuthSession, (req, res) => {
  res.render('courier/order', { layout: 'navbar.hbs', courier: true });
});

router.get('/history', checkAuthSession, (req, res) => {
  res.render('courier/history', { layout: 'navbar.hbs', courier: true });
});

router.get('/logout', async (req, res) => {
  await req.session.destroy()
  res.redirect('/')
})

module.exports = router;

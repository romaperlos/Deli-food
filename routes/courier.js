const express = require("express");
const router = express.Router();
const Courier = require('../models/courier.js');
const CourierOrder = require('../models/courierOrder');
const checkAuthSession = require('../auth/auth');
const nodemailer = require("nodemailer");
const session = require("express-session");

router.get('/main', checkAuthSession, async (req, res) => {
  const emailOfCourier = req.session.courier.email;
  const numberOfCourier = req.session.courier.phone;
  console.log(emailOfCourier);
  console.log('courier main');
  res.render('courier/main', { layout: 'navbar.hbs', courier: true, emailOfCourier, numberOfCourier });
});

router.get('/search', checkAuthSession, (req, res) => {
  res.render('courier/search', { layout: 'navbar.hbs', courier: true });
});

router.post('/search', checkAuthSession, async (req, res) => {
  const { cafe, basket, address, oldPrice, sales } = req.body;
  const courierOrders = await new CourierOrder({
    cafe,
    basket,
    address,
    sales,
    oldPrice,
    newPrice: oldPrice - (oldPrice / 100 * sales),
    email: req.session.courier.email,
    phoneOfCourier: req.session.courier.phone,
    date: new Date().toDateString(),
  });
  courierOrders.save();
  console.log(courierOrders);
  res.redirect('/courier/search');
})

router.get('/order', checkAuthSession, (req, res) => {
  const {street, house, flat, email} = req.query;
  console.log(street, house, flat, email);
  const transporter = nodemailer.createTransport({
    host: 'smtp.mail.ru',
    port: 465,
    sucure: true,
    auth: {
      user: 'delaver.fut@mail.ru',
      pass: '89150314855a',
    }
  });
  const mailOptions = {
    from: 'delaver.fut@mail.ru',
    to: email,
    subject: 'You order in the way!',
    text: `Hello, your order will be around 30 minutes`,
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Congratulation, your email has been sended!' + info.response);
    }
  });
  res.render('courier/order', { layout: 'navbar.hbs', courier: true, street, house, flat });
});

router.get('/history', checkAuthSession, async (req, res) => {
  const courier = req.session.courier;
  const email = req.session.courier.email;
  const courierOrders = await CourierOrder.find({ email });
  console.log(courierOrders);
  let flag = false;
  if (courierOrders.length === 0) {
    flag = true;
  }
  // console.log('>>>>>>>', email);
  console.log(courierOrders);
  console.log(email);
  res.render('courier/history', { layout: 'navbar.hbs', courierOrders, flag });
});

router.get('/logout', async (req, res) => {
  await req.session.destroy();
  res.redirect('/');
})

module.exports = router;

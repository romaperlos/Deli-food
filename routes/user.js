const express = require("express");
const router = express.Router();
const User = require('../models/user');
const Courier = require('../models/courier');
const UserOrder = require('../models/userOrder');
const CourierOrder = require('../models/courierOrder');
const checkAuthSession = require('../auth/auth');
const nodemailer = require("nodemailer");

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

// nodemailer logic

router.get('/order', checkAuthSession, async (req, res) => {
  const email = req.query.email;
  console.log(req.query);
  const emailOfCourier = await CourierOrder.findOne({ email });
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
    to: emailOfCourier.email,
    subject: 'You have a new order!',
    text: 'Hello, you should be deliver order on blablabla street.',
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log('email sent' + info.response);
    }
  });
  // console.log(emailOfCourier.id);
  // console.log(emailOfCourier.email);
  // console.log(emailOfCourier.phoneOfCourier);
  // console.log(emailOfCourier.email);

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

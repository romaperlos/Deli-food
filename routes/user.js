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
  const user = req.session.user;
  const oneUser = await User.findOne({ email: user.email })
  oneUser.street = street
  oneUser.house = house
  oneUser.flat = flat;
  await oneUser.save();
  req.session.user.street = street
  req.session.user.house = house
  req.session.user.flat = flat;
  console.log(oneUser);
  console.log(req.session.user);
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
    text: `Hello, you should be deliver order on ${req.session.user.street} ${req.session.user.house}, ${req.session.user.flat} street.`,
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Congratulation, your email has been sended!' + info.response);
    }
  });
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

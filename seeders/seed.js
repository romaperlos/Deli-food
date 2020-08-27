// Подключаем mongoose.
const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/delavery', { useNewUrlParser: true });

const User = require('../models/user');
const Courier = require('../models/courier');

const users = [
  {
    name: 'Nikita',
    email: '123@mail.ru',
    phone: 321123,
    password: 'qwerty'
  },
  {
    name: 'Roma',
    email: '321@gmail.ru',
    phone: 777777,
    password: 'ytrewq'
  },
  {
    name: 'Dima',
    email: 'yandex.ru',
    phone: 000111,
    password: 'zzzzzz'
  },
]

User.insertMany(users).then(() => mongoose.connection.close());

// const couriers = [
//   {
//     name: 'Tolik',
//     email: 'delivery.com',
//     phone: 222222,
//     password: 'lllll'
//   },
//   {
//     name: 'Semion',
//     email: 'yandex.dev@.com',
//     phone: 032103,
//     password: 'aaaaa'
//   },
//   {
//     name: 'Sasha',
//     email: 'uberHavka',
//     phone: 5435,
//     password: 'ggggg'
//   },
// ]

// Courier.insertMany(couriers).then(() => mongoose.connection.close());

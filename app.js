const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const methodOverride = require('method-override');
const mongoose = require("mongoose");
const path = require('path');
require('dotenv').config()

const app = express();

// Init routes
const registrationRouter = require('./routes/registration');
const loginRouter = require('./routes/login');
const courierRouter = require('./routes/courier');
const userRouter = require('./routes/user');


mongoose.connect(process.env.MONGO_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true });


app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'test',
  // store: new MongoStore({ mongooseConnection: mongoose.createConnection('process.env.MONGO_CONNECT', { useNewUrlParser: true, useUnifiedTopology: true }) }),
  resave: false,
  saveUninitialized: true,
  cookie: { path: '/', httpOnly: true, secure: false, maxAge: null },
}));


//////// check session /////////
app.use((req, res, next) => {
  // console.log('COOKIES: ', req.cookies);
  console.log('SESSION: ', req.session);
  if (req.session.user) {
    res.locals.user = req.session.user;
    // console.log(res.locals.user);
  }
  next();
})


app.use('/login', loginRouter);
app.use('/registration', registrationRouter);
app.use('/courier', courierRouter);
app.use('/user', userRouter);

app.get('/', (req, res) => {
  res.render('main')
})

const port = process.env.PORT || '3000';

app.listen(port, () => {
  console.log(`Server has been started on ${port}`);
});

const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const methodOverride = require('method-override');
const mongoose = require("mongoose");
const path = require('path');

const app = express();

// Init routes
const registrationRouter = require('./routes/registration');
const loginRouter = require('./routes/login')


app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'test',
  // store: new MongoStore({ mongooseConnection: mongoose.createConnection('mongodb://localhost:27017/broccoli2', { useNewUrlParser: true, useUnifiedTopology: true }) }),
  resave: false,
  saveUninitialized: true,
  cookie: { path: '/', httpOnly: true, secure: false, maxAge: null },
}));


app.use('/login',loginRouter);
app.use('/registration',registrationRouter);

app.get('/', (req, res) => {
  res.send('Hello')
})

const port = process.env.PORT || '3000';

app.listen(port, () => {
  console.log(`Server has been started on ${port}`);
});

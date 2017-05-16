'use strict';

const dotenv = require('dotenv').config();
const chalk = require('chalk');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const morgan = require('morgan');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const path = require('path');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const helpers = require('./helpers');

// connect to databse
const dbURI = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ds137801.mlab.com:37801/node-auth-starter`
mongoose.connect(dbURI);
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (err) => {
  console.error(chalk.red('Cannot connected to database.'));
})

// load our models
const User = require('./models/User');

// load handlers
require('./handlers/passport');

// import our routes
const routes = require('./routes/index')

// init our express app
const app = express();

// console logging tool
app.use(morgan('dev'));

// set view engine to pug
app.set('view engine', 'pug');

// serves up static files from the public folder. Anything in public/ will just be served up as the file it is
app.use(express.static(path.join(__dirname, 'public')));

// Takes the raw requests and turns them into usable properties on req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Exposes a bunch of methods for validating data. Used heavily on userController.validateRegister
app.use(expressValidator());

// populates req.cookies with any cookies that came along with the request
app.use(cookieParser());

// Sessions allow us to store data on visitors from request to request
// This keeps users logged in and allows us to send flash messages
app.use(session({
  secret: process.env.SECRET,
  key: process.env.KEY,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

// // Passport JS is what we use to handle our logins
app.use(passport.initialize());
app.use(passport.session());

// init out flash middleware
app.use(flash());

// variables that will be on all requests
app.use((req, res, next) => {
  res.locals.h = helpers;
  res.locals.flashes = req.flash();
  res.locals.user = req.user || null;
  res.locals.currentPath = req.path;
  next();
});


// import our routes
app.use('/', routes);

// start the server
app.set('port', process.env.PORT || 3000);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → ${chalk.yellow(`PORT ${server.address().port}`)}`);
});

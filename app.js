'use strict';

const dotenv = require('dotenv').config();
const chalk = require('chalk');
const mongoose = require('mongoose');
const express = require('express');
const morgan = require('morgan');

// connect to databse
const dbURI = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ds137801.mlab.com:37801/node-auth-starter`
mongoose.connect(dbURI);
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (err) => {
  console.error(chalk.red('Cannot connected to database.'));
})

// load our models
const User = require('./models/User');

// import our routes
const routes = require('./routes/index')

// init our express app
const app = express();

// console logging tool
app.use(morgan('dev'));

// set view engine to pug
app.set('view engine', 'pug');


// import our routes
app.use('/', routes);

// start the server
app.set('port', process.env.PORT || 3000);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → ${chalk.yellow(`PORT ${server.address().port}`)}`);
});

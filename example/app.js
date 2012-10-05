/*!
 * express-signup example
 */

/**
 * Module dependencies.
 */

var express = require('express'),
    app = module.exports = express(),
    config = require('./config'),
    mongoose = require('mongoose'),
    flash = require('express-flash'),
    User = require('basic-user-model'),
    signin = require('../index');

// Connect to DB
if (!mongoose.connection.db) {
  mongoose.connect(config.db.url);
};

// Views
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set('view options', { layout: false });

// Configuration
app.use(express.bodyParser());
app.use(express.static(__dirname + '/public'));

app.use(express.cookieParser(config.cookieSecret));
app.use(express.session({ cookie: { maxAge: 60000 }}));

// Flash
app.use(flash());

// Signin

app.use(signin(User));

// Routes
app.get('/', function (req, res) {
  res.render('index', {
    title: 'Home'
  });
});

// Error Handler
app.use(express.errorHandler());

/**
 * Module exports.
 */

if (!module.parent) {
  app.listen(8000);
  console.log('Express app started on port 8000');
};
/*!
 * express-signup example
 */

/**
 * Module dependencies.
 */

var express = require('express'),
    config = require('./config'),
    mongoose = require('mongoose'),
    namedRoutes = require('express-named-routes'),
    attach = require('attach'),
    Storekeeper = require('storekeeper'),
    flash = require('express-flash'),
    UserSchema = require('basic-user-schema'),
    Signin = require('../index');

/**
 * Module Exports
 */

exports = module.exports = function () {

  var self = express(),
      shared = {
        model: function () {
          return mongoose.model.apply(mongoose, arguments);
        }
      },
      signin = Signin(shared);

  namedRoutes.extend(self);
  attach.extend(self);

  function init () {

    // Connect to DB
    if (!mongoose.connection.db) {
      mongoose.connect(config.db.url);
    };

    shared.model('User', UserSchema());

    // Define Named Routes
    self.defineRoute('index', '/');
    self.defineRoute('signin', '/'); // signin will be attached here

    // Views
    self.set('views', __dirname + '/views');
    self.set('view engine', 'jade');
    self.set('view options', { layout: false });

    // Middleware
    self.use(express.bodyParser());
    self.use(express.static(__dirname + '/public'));
    self.use(express.cookieParser(config.cookieSecret));
    self.use(express.session({ cookie: { maxAge: 60000 }}));
    self.use(flash());

    // Routes
    self.get(self.lookupRoute('index'), function (req, res) {
      res.render('index', {
        title: 'Home'
      });
    });

    // Signin

    self.attach('signin', signin);

    // Error Handler Middleware
    self.use(express.errorHandler());

    self.emit('init');

  };

  function ready () {
    self.emit('ready');
  };

  signin.on('init', init);
  signin.on('ready', ready);

  return self;

};

if (!module.parent) {
  var app = module.exports();
  app.on('ready', function () {
    app.listen(8000);
    console.log('App started on port 8000');
  });
};
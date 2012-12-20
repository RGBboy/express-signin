/*!
 * express-signin
 * Copyright(c) 2012 RGBboy <me@rgbboy.com>
 * MIT Licensed
 */

/**
 * Module Dependencies
 */

var EventEmitter = require('events').EventEmitter,
    routable = require('routable'),
    Controller = require('./controller');

/**
 * Return a middleware function
 *
 * @param {String} route, optional
 * @param {Object} User
 * @return {Function} middleware function
 * @api public
 */

exports = module.exports = function (shared) {

  var self = new EventEmitter(),
      User;

  routable.extend(self);

  function attach() {

    // instantiate controller
    var controller = Controller(shared.model('User'));

    // Define Named Routes
    // index is rewritten to be base route + /signin, because
    // this is normally mounted to the app index ('/')
    self.defineRoute('index', '/signin');
    self.defineRoute('signin', '/signin');
    self.defineRoute('signout', '/signout');

    // Define Routes
    // Should these only be available to anonymous users?
    self.get(self.lookupRoute('signin'), controller.new);
    self.post(self.lookupRoute('signin'), controller.create);
    // should restrict this to signed in users
    self.get(self.lookupRoute('signout'), controller.destroy);

    self.emit('ready', self);

  };

  self.on('attached', attach);

  process.nextTick(function () {
    self.emit('init', self);
  });

  return self;

};

/**
 * Library version.
 */

exports.version = '0.0.2';
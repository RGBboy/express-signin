/*!
 * express-signin
 * Copyright(c) 2012 RGBboy <me@rgbboy.com>
 * MIT Licensed
 */

/**
 * Module Dependencies
 */

var routable = require('routable'),
    Controller = require('./controller');

/**
 * Module Exports
 */

exports = module.exports = function (route, User) {

  if ('string' !== typeof route) {
    User = route;
    route = undefined;
  };

  // start the component from an express app.
  var component = routable(route),
      controller = Controller(User);

  // index is rewritten to be base route + /signin, because
  // this is normally mounted to the app index ('/')
  component.defineRoute('index', '/signin');
  component.defineRoute('signin', '/signin');
  component.defineRoute('signout', '/signout');

  // Should these only be available to anonymous users?
  component.get(component.lookupRoute('signin'), controller.new);
  component.post(component.lookupRoute('signin'), controller.create);
  // should restrict this to signed in users
  component.get(component.lookupRoute('signout'), controller.destroy);

  return component;

};

/**
 * Library version.
 */

exports.version = '0.0.1';
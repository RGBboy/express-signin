/**
 * Signin Controller
 *
 * @todo Change so the view shows nice errors to the user.
 * @todo Change that POST routes do not render, they redirect.
 */

/**
 * Module Exports
 */

exports = module.exports = function (User) {

  var controller = {};

  controller.new = function (req, res) {
    res.render('signin', {
      title: 'Sign In',
      user: {}
    });
  };

  // This should also check that req.body.user exists so an exception is not thrown.
  controller.create = function (req, res) {
    if (!req.body.user || !req.body.user.email || !req.body.user.password) {
      req.flash('error', 'The email or password you entered is incorrect.');
      res.redirect(req.routeToPath('signin'));
      return;
    };
    var redirect = req.session.redirect || '/'
    User.findByEmail( req.body.user.email, function (err, user) {
      if (err) {
        req.flash('error', 'Something went wrong.'); // change this
        res.render('signin', {
          title: 'Sign In',
          user: req.body.user || {}
        });
        return;
      };
      if (user) {
        user.authenticate(req.body.user.password, function (err, isMatch) {
          if (err || !isMatch) { // May want to split these up
            // handle error
            req.flash('error', 'The email or password you entered is incorrect.');
            res.redirect(req.routeToPath('signin'));
            return;
          }
          req.flash('info', 'You are now signed in.');
          req.session.email = user.email;
          delete req.session.redirect;
          res.redirect(redirect);
        })
      } else {
        req.flash('error', 'The email or password you entered is incorrect.');
        res.redirect(req.routeToPath('signin'));
        return;
      };
    });
  };

  controller.destroy = function (req, res, next) {
    req.session.regenerate( function (err) {
      if (err) { 
        next(err);
        return
      };
      req.flash('info', 'You are now signed out.')
      res.redirect('/');
    });
  };

  return controller;

};
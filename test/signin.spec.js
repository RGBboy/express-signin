/**
 * Express Signin Spec
 *
 * @todo write process helpers
 * @todo remove tests that should be in the model
 */

/**
 * Module dependencies.
 */

var App = require('../example/app'),
    mongoose = require('mongoose'),
    request = require('superagent'),
    should = require('should');

/**
 * Tests
 */

describe('Sign In', function () {

  var app,
      UserModel,
      fakeUser = {
        email: 'test@test.com',
        password: 'testPassword'
      },
      user,
      baseURL,
      server;

  before(function (done) {

    app = App();

    app.on('ready', function () {
      UserModel = mongoose.model('User');
      if (!app.address) {
        var port = 8000;
        server = app.listen(port);
        baseURL = 'http://localhost:' + port;
      } else {
        baseURL = 'http://localhost:' + app.address().port;
      };

      var newUser;
      UserModel.remove(function (err) {
        if (err) { throw err };
        newUser = new UserModel({
          email: fakeUser.email,
          password: fakeUser.password,
          passwordConfirm: fakeUser.password
        });
        newUser.save(function (err, user) {
          user = user;
          done();
        });
      });
    })
  });

  after(function (done) {
    //close app
    server.close(done);
  })

  describe('GET /signin', function () {

    it('should render the signin page', function (done) {
        request
          .get(baseURL + '/signin')
          .redirects(0)
          .end(function (err, res) {
            res.statusCode.should.equal(200);
            res.text.should.include('<title>Sign In</title>');
            done();
          })
    });

  });

  describe('POST /signin', function () {

    describe('when correct crudentials are POSTed', function () {

      // Is this an accurate test to see if a user is signed in?
      it('should sign in a user', function (done) {
        request.agent()
          .post(baseURL + '/signin')
          .send({ 
            user: fakeUser,
          })
          .end(function (err, res) {
            res.text.should.include('You are now signed in.');
            done();
          });
      });

      // We may want this to redirect to the original requested URL
      it('should redirect to /', function (done) {
        request
          .post(baseURL + '/signin')
          .redirects(0)
          .send({ 
            user: fakeUser,
          })
          .end(function (err, res) {
            res.statusCode.should.equal(302)
            res.headers.should.have.property('location').match(/\/$/);
            done();
          });
      });

      it('should redirect to the original requested page', function (done) {
        var agent = request.agent();
        agent
          .get(baseURL + '/restricted')
          .redirects(1)
          .end(function (err, res) {
            res.statusCode.should.equal(200)
            res.req.path.should.equal('/signin');
            agent
              .post(baseURL + '/signin')
              .redirects(0)
              .send({
                user: fakeUser
              })
              .end(function (err, res) {
                res.headers.should.have.property('location').match(/\/restricted$/);
                res.statusCode.should.equal(302)
                done();
              });
          });
      });

    });

    describe('when nothing is POSTed', function () {

      it('should redirect back to /signin', function (done) {
        request.agent()
          .post(baseURL + '/signin')
          .redirects(0)
          .send({})
          .end(function (err, res) {
            res.headers.should.have.property('location').match(/\/signin$/);
            res.statusCode.should.equal(302)
            done();
          });
      });

    });

    describe('when incorrect crudentials are POSTed', function () {

      it('should redirect back to /signin', function (done) {
        request.agent()
          .post(baseURL + '/signin')
          .redirects(0)
          .send({
            user: {
              email: '',
              password: fakeUser.password
            }
          })
          .end(function (err, res) {
            res.statusCode.should.equal(302);
            res.headers.should.have.property('location').match(/\/signin$/);
            done();
          });
      });

      it('should show an error if email is empty', function (done) {
        request.agent()
          .post(baseURL + '/signin')
          .send({ 
            user: {
              email: '',
              password: fakeUser.password
            }
          })
          .end(function (err, res) {
            res.text.should.include('<title>Sign In</title>')
            res.text.should.include('The email or password you entered is incorrect.');
            done();
          });
      });

      it('should show an error if email is missing', function (done) {
        request.agent()
          .post(baseURL + '/signin')
          .send({ 
            user: {
              password: fakeUser.password
            }
          })
          .end(function (err, res) {
            res.text.should.include('<title>Sign In</title>')
            res.text.should.include('The email or password you entered is incorrect.');
            done();
          });
      });

      it('should show an error if email is not valid', function (done) {
        request.agent()
          .post(baseURL + '/signin')
          .send({ 
            user: {
              email: 'testtest.com',
              password: fakeUser.password
            }
          })
          .end(function (err, res) {
            res.text.should.include('<title>Sign In</title>')
            res.text.should.include('The email or password you entered is incorrect.');
            done();
          });
      });

      it('should show an error if password is missing', function (done) {
        request.agent()
          .post(baseURL + '/signin')
          .send({ 
            user: {
              email: fakeUser.email,
            }
          })
          .end(function (err, res) {
            res.text.should.include('<title>Sign In</title>')
            res.text.should.include('The email or password you entered is incorrect.');
            done();
          });
      });

      it('should show an error if password is empty', function (done) {
        request.agent()
          .post(baseURL + '/signin')
          .send({ 
            user: {
              email: fakeUser.email,
              password: ''
            }
          })
          .end(function (err, res) {
            res.text.should.include('<title>Sign In</title>')
            res.text.should.include('The email or password you entered is incorrect.');
            done();
          });
      });

      it('should show an error if password is not valid', function (done) {
        request.agent()
          .post(baseURL + '/signin')
          .send({ 
            user: {
              email: fakeUser.email,
              password: 'notTestPassword'
            }
          })
          .end(function (err, res) {
            res.text.should.include('<title>Sign In</title>')
            res.text.should.include('The email or password you entered is incorrect.');
            done();
          });
      });

    });

  });

  describe('GET /signout', function () {

    var agent;

    beforeEach(function (done) {
      agent = request.agent();
      agent
        .post(baseURL + '/signin')
        .send({ 
          user: fakeUser,
        })
        .end(function (err, res) {
          done();
        });
    });

    it('should sign the user out', function (done) {
      agent
        .get(baseURL + '/signout')
        .end(function (err, res) {
          res.statusCode.should.equal(200);
          res.text.should.include('You are now signed out.');
          done();
        });
    });

    it('should redirect to /', function (done) {
      agent
        .get(baseURL + '/signout')
        .redirects(0)
        .end(function (err, res) {
          res.statusCode.should.equal(302);
          res.headers.should.have.property('location').match(/\/$/);
          done();
        });
    });

  });

});
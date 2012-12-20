/**
 * Express Signup Unit Tests
 */

/**
 * Module dependencies.
 */

var should = require('should'),
    Signin = require('../');

/**
 * Tests
 */

describe('Sign In', function () {

  describe('.version', function () {

    it('should match the format x.x.x', function (done) {
      Signin.version.should.match(/^\d+\.\d+\.\d+$/);
      done();
    });

  });

});
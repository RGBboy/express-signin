/**
 * Express Signup Unit Tests
 */

/**
 * Module dependencies.
 */

var should = require('should'),
    signin = require('../');

/**
 * Tests
 */

describe('Sign In', function () {

  describe('.version', function () {

    it('should match the format x.x.x', function (done) {
      signin.version.should.match(/^\d+\.\d+\.\d+$/);
      done();
    });

  });

});
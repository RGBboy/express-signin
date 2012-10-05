var environment =  process.env.NODE_ENV || 'development';

var config = {
  development: {
    cookieSecret: '23vdh23llfk949038hckjd3',
    db: {
      url: 'mongodb://express-signin-dev:express-signin-dev@localhost/express-signin-dev'
    }
  },
  test: {
    cookieSecret: '23vdh23llfk949038hckjd3',
    db: {
      url: 'mongodb://express-signin-test:express-signin-test@localhost/express-signin-test'
    }
  }
};

exports = module.exports = config[environment];
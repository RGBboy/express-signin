# Express Signin

  User Signin Component for your Express Application

  [![Build Status](https://secure.travis-ci.org/RGBboy/express-signin.png)](http://travis-ci.org/RGBboy/express-signin)

## Installation

  Works with Express 3.0.x

    npm install git://github.com/RGBboy/express-signin.git

## Usage

Require it:

``` javascript
  signin = require('express-signin');
```

Use it:

``` javascript
  app.use(signin(route, UserModel))
```

## Requires

### Middleware

  The following middleware should be used by the application before the 
  Signin Component:

  * express.bodyParser
  * express.cookieParser
  * express.session
  * express-flash

### Views

  The following views should be made available in your view directory:

  * ./signin

### Other

  Express Signin requires a User Model to be passed in upon construction. 
  The User Model needs to implement the following:

#### User.findByEmail(email, function (err, user) {})

  The `.findByEmail` method takes an email string as an argument and a 
  callback. The callback should respond with an error or the user.

#### userInstance.authenticate(password, function (err, user) {})

  The `.authenticate` method takes a password string as an argument and a 
  callback. The callback should respond with an error or a boolean 
  reflecting the outcome of authentication.

## Setting Up Development

  In order to develop and run tests with the supplied example you will 
  need to set up MongoDB with two databases:

  * express-signin-test
  * express-signin-dev

The usernames and passwords for each are the same as their database names.

## Todo

  * Change so the view shows nice errors to the user.
  * Update so the view is not rendered in the POST method (should redirect back).
  * Double check that relaying the req.body.user to the signin view is 
    not a security risk.
  * Write process helpers for other components to use for integration tests.
  * Add restrictions to routes!
  * Make example use SSL

## License 

(The MIT License)

Copyright (c) 2012 RGBboy &lt;me@rgbboy.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
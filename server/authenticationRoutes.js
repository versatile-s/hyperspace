var authRouter = require('express').Router();
var path = require('path');
var utils = require('./utilities');


authRouter.route('/login')
  .get(function (req, res) {
    if (utils.isAuth(req, res) === true) {
      res.redirect('/dashboard');
      console.log('YOU ARE BEING REDIRECTED');
    } else {
      res.sendFile(path.resolve(__dirname + '/../client/index.html' ));
    }
  });

authRouter.route('/signup')
  .get(function(req, res) {
    if (utils.isAuth(req, res) === true) {
      res.redirect('/dashboard');
      console.log('YOU ARE BEING REDIRECTED');
    } else {
      res.sendFile(path.resolve(__dirname + '/../client/index.html' ));
    }
  });

authRouter.route('/dashboard')
  .get(function(req, res) {
    if (utils.isAuth(req, res) === false) {
      res.redirect('/login');
      console.log('YOU ARE BEING REDIRECTED');
    } else {
      res.sendFile(path.resolve(__dirname + '/../client/index.html' ));
    }
  });

module.exports = authRouter;
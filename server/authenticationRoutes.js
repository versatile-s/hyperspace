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
      console.log('YOU ARE BEING REDIRECTED, but first, utils.isAuth looks like this: ', utils.isAuth(req, res), ' but req.session is like this: ', req.session);
    } else {
      res.sendFile(path.resolve(__dirname + '/../client/index.html' ));
    }
  });

authRouter.route('/dashboard')
  .get(function(req, res) {
    console.log('ok so req.session is ', req.session);
    if (req.session.login === false || req.session.login === undefined) {
    //if (utils.isAuth(req, res) === false) {
      res.redirect('/login');
      console.log('YOU ARE BEING REDIRECTED');
    } else {
      res.sendFile(path.resolve(__dirname + '/../client/index.html' ));
    }
  });

module.exports = authRouter;
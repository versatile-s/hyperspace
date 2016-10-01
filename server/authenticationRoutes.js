var authRouter = require('express').Router();
var path = require('path');
//var utils = require('./utilities');


authRouter.route('/login')
  .get(function (req, res) {
    if (req.session.user) {
      res.redirect('/dashboard');
      console.log('YOU ARE BEING REDIRECTED');
    } else {
      console.log('not being redirected here is req.session.user ', req.session.user);
      console.log('not being redirected here is req.session ', req.session);
      res.sendFile(path.resolve(__dirname + '/../client/index.html' ));
    }
  });

authRouter.route('/signup')
  .get(function(req, res) {
    if (req.session.user) {
      res.redirect('/dashboard');
      console.log('YOU ARE BEING REDIRECTED, but first, utils.isAuth looks like this: ', utils.isAuth(req, res), ' but req.session is like this: ', req.session);
    } else {
      res.sendFile(path.resolve(__dirname + '/../client/index.html' ));
    }
  });

authRouter.route('/dashboard')
  .get(function(req, res) {
    console.log('ok so req.session is ', req.session);
    if (!req.session.user) {
    //if (utils.isAuth(req, res) === false) {
      res.redirect('/login');
    } else {
      console.log('ok req.session is this: ', req.session);
      res.sendFile(path.resolve(__dirname + '/../client/index.html' ));
    }
  });

module.exports = authRouter;

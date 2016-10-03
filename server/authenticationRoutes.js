//var authRouter = require('express');
var path = require('path');
module.exports = (authRouter, express) => {
  authRouter.route('/login')
    .get(function (req, res) {
      if (req.session) {
        res.redirect('/dashboard');
        console.log('YOU ARE BEING REDIRECTED, and session ID is... WAIT FOR IT>>> ', req.session.id);
      } else {
        console.log('not being redirected here is req.session.user ', req.session.user);
        console.log('not being redirected here is req.session ', req.session);
        res.sendFile(path.resolve(__dirname + '/../client/index.html' ));
      }
    });

  authRouter.route('/signup')
    .get(function(req, res) {
      if (req.session.id) {
        console.log('YOU ARE BEING REDIRECTED, and session ID is... WAIT FOR IT>>> ', req.session.id);
        res.redirect('/dashboard');
      } else {
        res.sendFile(path.resolve(__dirname + '/../client/index.html' ));
      }
    });

  authRouter.route('/dashboard')
    .get(function(req, res) {
      //console.log('ok so req.sessionID is ', req.session);
      if (!req.session) {
      //if (utils.isAuth(req, res) === false) {
        res.redirect('/login');
      } else {
        //console.log('ok req.session is this: ', req.session);
        res.sendFile(path.resolve(__dirname + '/../client/index.html' ));
      }
    });

};


//var utils = require('./utilities');




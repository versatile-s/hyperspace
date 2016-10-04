//var authRouter = require('express');
var path = require('path');
module.exports = (authRouter, express) => {
  authRouter.route('/login')
    .get(function (req, res) {
      if (req.session.user) {
        res.redirect('/dashboard');
      } else {
        res.sendFile(path.resolve(__dirname + '/../client/index.html' ));
      }
    });

  authRouter.route('/signup')
    .get(function(req, res) {
      if (req.session) {
        res.redirect('/dashboard');
      } else {
        res.sendFile(path.resolve(__dirname + '/../client/index.html' ));
      }
    });

  authRouter.route('/dashboard')
    .get(function(req, res) {
      if (!req.session.id) {
        res.redirect('/login');
      } else {
        res.sendFile(path.resolve(__dirname + '/../client/index.html' ));
      }
    });

};


//var utils = require('./utilities');




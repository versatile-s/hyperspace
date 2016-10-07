//var authRouter = require('express');
var path = require('path');
var utils = require('./utilities');

module.exports = (authRouter) => {
  authRouter.get('/', function(req, res) {
    if (utils.isAuth(req, res)) {
      res.redirect('/' + req.session.key[0].username + '/home');
    } else {
      res.sendFile(path.resolve(__dirname + '/../client/index.html' ));
    }
  });

  authRouter.get('/login', function(req, res) {
    if (utils.isAuth(req, res)) {
      res.redirect('/' + req.session.key[0].username + '/home');
    } else {
      res.sendFile(path.resolve(__dirname + '/../client/index.html' ));
    }
  });

  authRouter.get('/signup', function(req, res) {
    if (utils.isAuth(req, res)) {
      res.redirect('/' + req.session.key[0].username + '/home');
    } else {
      res.sendFile(path.resolve(__dirname + '/../client/index.html' ));
    }
  });

  authRouter.get('/dashboard', function(req, res) {
    if (utils.isAuth(req, res) === false) {
      res.redirect('/login');
    } else {
      res.sendFile(path.resolve(__dirname + '/../client/index.html' ));
    }
  });
};


//var utils = require('./utilities');




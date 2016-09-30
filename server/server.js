var express = require('express');
var router = require('./router');
var bodyParser = require('body-parser');
var path = require('path');
var history = require('connect-history-api-fallback');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var utils = require('./utilities');


var server = express();

server.use(cookieParser('secret'));
server.use(session({
  secret: 'Our Secret',
  resave: false,
  saveUninitialized: true,
  // store: new (require('express-sessions'))({
  //   storage: 'redis',
  //   instance: client, // optional
  //   host: 'localhost', // optional
  //   port: 6379, // optional
  //   collection: 'sessions', // optional
  //   expire: 86400 // optional
  // })
}));

/*********************************/
/*********************************/
  //API CALLS FOR AUTHENTICATION//
/*********************************/
/*********************************/
server.get('/login', function(req, res) {
  if (utils.isAuth(req, res) === true) {
    res.redirect('/dashboard');
    console.log('YOU ARE BEING REDIRECTED');
  } else {
    res.sendFile(path.resolve(__dirname + '/../client/index.html' ));
  }
});
server.get('/signup', function(req, res) {
  if (utils.isAuth(req, res) === true) {
    res.redirect('/dashboard');
    console.log('YOU ARE BEING REDIRECTED');
  } else {
    res.sendFile(path.resolve(__dirname + '/../client/index.html' ));
  }
});
server.get('/dashboard', function(req, res) {
  if (utils.isAuth(req, res) === false) {
    res.redirect('/login');
    console.log('YOU ARE BEING REDIRECTED');
  } else {
    res.sendFile(path.resolve(__dirname + '/../client/index.html' ));
  }
});

server.use(history());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ 'extended': false }));
server.use(express.static(path.join(__dirname, '../client')));






server.use('/', router);

var port = process.env.port || 3000;


server.listen(port, function() {
  console.log('Server is listening on port ' + port + '!');
});
var express = require('express');
var router = require('./router');
var bodyParser = require('body-parser');
var path = require('path');
var history = require('connect-history-api-fallback');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var authRouter = require('./authenticationRoutes');

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

// API Calls for AUTH Redirects
server.use('/', authRouter);

server.use(history());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ 'extended': false }));
server.use(express.static(path.join(__dirname, '../client')));



server.use('/', router);

var port = process.env.port || 3000;


server.listen(port, function() {
  console.log('Server is listening on port ' + port + '!');
});
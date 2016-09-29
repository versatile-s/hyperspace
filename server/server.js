var express = require('express');
var router = require('./router');
var bodyParser = require('body-parser');
var path = require('path');
var history = require('connect-history-api-fallback');
var session = require('express-session');
var cookieParser = require('cookie-parser');


var server = express();

server.use(history());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ 'extended': false }));
server.use(express.static(path.join(__dirname, '../client')));


server.use(cookieParser('secret'));
server.use(session({
  secret: 'Our Secret',
  resave: false,
  saveUninitialized: true
}));
server.use('/', router);

var port = process.env.port || 3000;


server.listen(port, function() {
  console.log('Server is listening on port ' + port + '!');
});
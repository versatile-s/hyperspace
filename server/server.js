var express = require('express');
var router = require('./router');
var bodyParser = require('body-parser');

var server = express();

var port = process.env.port || 3000;

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ 'extended': false }));

server.use(router);

server.listen(port, function() {
  console.log('Server is listening on port ' + port + '!');
});
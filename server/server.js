var express = require('express');
var router = require('./router');

var server = express();

var port = process.env.port || 3000;

server.use(router);

server.listen(port, function() {
  console.log('Server is listening on port ' + port + '!');
});
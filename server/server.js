var express = require('express');

var server = express();

var port = process.env.port || 3000;

server.get('/', function(req, res) {
  res.send('You are now viewing / of hyperspace!');
});

server.listen(port, function() {
  console.log('Server is listening on port ' + port + '!');
});
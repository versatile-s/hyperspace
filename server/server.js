var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var history = require('connect-history-api-fallback');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var utils = require('./utilities');
var logger = require('morgan');
/*var redis = require('redis');
var RedisStore = require('connect-redis')(session);
var client = redis.createClient();*/
var server = express();
var router = require('./router');
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ 'extended': false }));

// Populates req.session
server.use(session({
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  secret: 'keyboard cat',
  name: 'Yosh Cookies',
/*  store: new RedisStore({
    logErrors: true,
    host: 'localhost',
    port: 6379,
    client: client,
    ttl: 260
  })
*/}));

server.use(logger('dev'));

/*********************************/
/*********************************/
  //API CALLS FOR AUTHENTICATION//
/*********************************/
/*********************************/
server.get('*/reset.css', function (req, res) {
  res.sendFile(path.join(__dirname, '../client/styles/reset.css'));
});
server.get('*/styles.css', function (req, res) {
  res.sendFile(path.join(__dirname, '../client/styles/styles.css'));
});

//image serving work-around
// server.get('*/assets/*', function (req, res) {
//   res.sendFile(path.join(__dirname, '../client/assets'));
// });

// AuthRoutes are all of our endpoints that need to take priority over all else.
// This servers for all of our session based authorization for example.
require('./authenticationRoutes')(server);

server.get('/userTags', function (req, res) {
  utils.getUserTags(req, res);
});

// get a user's categories
server.get('/userCategories', function (req, res) {
  utils.getUserCategories(req, res);
});

// IMPORTANT any remaining routes that have NOT hit the authRoutes already will be first sent
// to the client code in app.js and hit the React Router. Only if a request does not hit the react router
// will it fallback into the server side router.js file.
server.use(history());
server.use(express.static(path.join(__dirname, '../client/')));
require('./router.js')(server);

var port = process.env.port || 3000;
server.listen(port, function() {
  console.log('Server is listening on port ' + port + '...');
});

module.exports = server;

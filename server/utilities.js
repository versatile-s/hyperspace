var db = require('./db').sequelize;
var User = require('./db').User;

var utils = {

  var createUser = function (username, password) {

    User.sync()
      .then(function (username, password) {
        return User.create({
          username: username,
          password: password
        });
      });

  };

  var loginUser = function (username, password) {

    db.query('SELECT * FROM Users WHERE username = :username AND password = :password',
      {replacements: {username: username, password: password}, type: sequelize.QueryTypes.SELECT })
      .then(function (results) {
        if (results.length === 1) {
          return true;
        } else {
          return false;
        }
      });
  };

};

module.exports = utils;
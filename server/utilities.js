var db = require('./db/db').sequelize;
var User = require('./db/db').User;

var utils = {

  createUser: function (username, password) {

    User.sync()
      .then(function () {
        return User.create({
          username: username,
          password: password
        });
      });

  },

  loginUser: function (req, res) {

    db.query('SELECT * FROM Users WHERE username = :username AND password = :password',
      {replacements: {username: req.body.username, password: req.body.password}, type: db.QueryTypes.SELECT })
      .then(function (results) {
        if (results.length === 1) {
          res.send('Login successful!');
        } else {
          res.status(400).send('Information provided does not match records.');
        }
      });
  }

};

module.exports = utils;
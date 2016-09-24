var Sequelize = require('sequelize');
var sequelize = new Sequelize('hyperspace', 'root', 'hi');

var User = sequelize.define('User', {
  username: Sequelize.STRING,
  password: Sequelize.STRING
});

module.exports.sequelize = sequelize;
module.exports.User = User;
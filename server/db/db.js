var Sequelize = require('sequelize');

var sequelize = new Sequelize('hyperspace', 'root', '');

var User = sequelize.define('User', {
  username: Sequelize.STRING,
  password: Sequelize.STRING
});

var Hyper = sequelize.define('Hyper', {
  url: Sequelize.STRING,
  title: Sequelize.STRING,
  description: Sequelize.STRING
});

// deletes and creates User table
// User.sync({force: true})
//   .then();

sequelize.authenticate()
  .then(function(err) {
    console.log('Connection has been made successfully.');
  })
  .catch(function(err) {
    console.log('Unable to connect to the db: ', err);
  });

module.exports.sequelize = sequelize;
module.exports.User = User;
module.exports.Hyper = Hyper;
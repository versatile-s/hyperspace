var Sequelize = require('sequelize');

var sequelize = new Sequelize('hyperspace', 'root', '');

var User = sequelize.define('User', {
  username: { type: Sequelize.STRING },
  password: { type: Sequelize.STRING }
});

var Hyper = sequelize.define('Hyper', {
  url: { type: Sequelize.STRING },
  title: { type: Sequelize.STRING },
  description: { type: Sequelize.STRING },
  image: { type: Sequelize.STRING },
  // Datatype of array only available in postgres so need to find a work around.
  // tags: { type: Sequelize.ARRAY },
  // widgets: { type: Sequelize.ARRAY }
});

// Hyper.sync()
//   .then(function() {
//     console.log('ok we have created the Hyper database');
//     return Hyper.create({
//       url: 'peh',
//       title: 'nada',
//       description: 'nada',
//       image: 'nada'
//     });
//   });
// //deletes and creates User table
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



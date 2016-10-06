var Sequelize = require('sequelize');
var dbPassword = require('./dbConfig.js');
var sequelize = new Sequelize('hyperspace', 'root', dbPassword, {logging: false});


var User = sequelize.define('User', {
  username: { type: Sequelize.STRING },
  password: { type: Sequelize.STRING },
  firstName: { type: Sequelize.STRING },
  lastName: { type: Sequelize.STRING },
  photo: { type: Sequelize.STRING },
  categoryPages: { type: Sequelize.STRING },
  email: { type: Sequelize.STRING }
});

var Hyper = sequelize.define('Hyper', {
  url: { type: Sequelize.STRING },
  title: { type: Sequelize.STRING },
  description: { type: Sequelize.STRING },
  image: { type: Sequelize.STRING },
  username: { type: Sequelize.STRING },
  tags: { type: Sequelize.STRING },
  views: {type: Sequelize.INTEGER }

  // Datatype of array only available in postgres so need to find a work around.
  // tags: { type: Sequelize.ARRAY },
  // widgets: { type: Sequelize.ARRAY }
});

var CategoryPage = sequelize.define('CategoryPage', {
  name: { type: Sequelize.STRING },
  parentCategory: { type: Sequelize.STRING },
  subCategories: { type: Sequelize.STRING },
  widgets: { type: Sequelize.STRING },
  preferences: { type: Sequelize.STRING }
});

var Friend = sequelize.define('Friend', {
  name: {type: Sequelize.STRING},
  category: {type: Sequelize.STRING}
});

User.sync().then(function () {
  CategoryPage.belongsTo(User, {foreignKey: 'UserId'});
  Friend.belongsTo(User, {foreignKey: 'UserId'});
  Friend.sync();
  CategoryPage.sync().then(function () {
    Hyper.belongsTo(CategoryPage, {foreignKey: 'CategoryPageId'});
    Hyper.sync().then(function () {
    });
  });
});

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
module.exports.CategoryPage = CategoryPage;
module.exports.Friend = Friend;

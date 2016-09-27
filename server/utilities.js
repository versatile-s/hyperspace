var db = require('./db/db').sequelize;
var User = require('./db/db').User;
var Hyper = require('./db/db').Hyper;
var CategoryPage = require('./db/db').CategoryPage;

var utils = {

  // USERS
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
  },

  // HYPERS (Post request to /link)
  saveHyper: function (req, res) {
    Hyper.sync()
    .then(function () {
      return Hyper.create({
        url: req.body.url,
        title: req.body.title,
        description: '',
        image: ''
      });
    });
  },


  // This will save a category page. It only needs a name property at time of creation and potentially parentCategories
  saveCategoryPage: function (req, res) {
    CategoryPage.sync()
    .then(function () {
      return CategoryPage.create({
        name: req.body.name,
        parentCategory: req.body.parents
      });
    });
  },

  // This will update a category page. On the front end it is important that the req object has all of the fields.
  // Any fields that have not been changed need to remain as they were but still include in the request object.
  updateCategoryPage: function (req, res) {
    console.log('ok at least updateCategory is being called');
    CategoryPage.findById(req.body.id)
    .then(function(selectedPage) {
      selectedPage.update({
        name: req.body.name,
        parentCategory: req.body.parents,
        subCategories: req.body.subCategories,
        hypers: req.body.hypers,
        widgets: req.body.widgets,
        preferences: req.body.preferences
      });
    });
  }

};

module.exports = utils;

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

  updateUser: function (req, res) {
    User.findById(req.body.id)
    .then(function(selectedUser) {
      selectedUser.update({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        photo: req.body.photo,
        categoryPages: req.body.categoryPages,
        email: req.body.email
      });
    });
  },

  isAuth: function (req, res) {
    return (req.session) ? true : false;
  },

  loginUser: function (req, res) {
    db.query('SELECT * FROM Users WHERE username = :username AND password = :password',
      {replacements: {username: req.body.username, password: req.body.password}, type: db.QueryTypes.SELECT })
      .then(function (results) {
        if (results.length === 1) {
          // req.session.regenerate(function(err) {
          res.send('Login successful!');
          // });
        } else {
          res.status(400).send('Information provided does not match records.');
        }
      });
  },

  // HYPERS (Post request to /link)
  saveHyper: function (req, res) {
    var userId = 0;
    User.findOne({
      where: {
        username: req.body.username
      }
    }).then(function (user) {
      console.log(req.body.category);
      userId = user.id;
      var name = req.body.category || 'home';
      CategoryPage.findOne({
        where: {
          name: name,
          UserId: user.id
        }
      }).then(function(category) {
        if (!category) {
          CategoryPage.create({
            name: name,
            parentCategory: req.body.parents,
            UserId: userId
          }).then(function () {
            return CategoryPage.findOne({
              where: {
                name: name,
                UserId: userId
              }
            }).then(function (category) {
              return Hyper.create({
                url: req.body.url,
                title: req.body.title,
                description: req.body.description,
                image: req.body.image,
                username: req.body.username,
                CategoryPageId: category.id
              });
            });
          });
        } else {
          return Hyper.create({
            url: req.body.url,
            title: req.body.title,
            description: req.body.description,
            image: req.body.image,
            username: req.body.username,
            CategoryPageId: category.id
          });
        }
      });
    });
  },


  // This will save a category page. It only needs a name property at time of creation and potentially parentCategories
  saveCategoryPage: function (req, res) {

    User.findOne({
      where: {
        username: req.body.username
      }
    }).then(function (user) {
      CategoryPage.findOne({
        where: {
          UserId: user.id,
          name: req.body.name
        }
      }).then(function (result) {
        if (!result) {
          CategoryPage.sync()
          .then(function () {
            return CategoryPage.create({
              name: req.body.name,
              parentCategory: req.body.parents,
              UserId: user.id
            });
          });
        }
      });
    });
  },

  // This will update a category page. On the front end it is important that the req object has all of the fields.
  // Any fields that have not been changed need to remain as they were but still include in the request object.
  updateCategoryPage: function (req, res) {
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
  },

  getCategoryData: function (req, res) {
    console.log("username/categorytitle", req.body.username,req.body.categoryTitle);
    User.findOne({
      where: {
        username: req.body.username
      }
    }).then(function (user) {
      CategoryPage.findOne({
        where: {
          name: req.body.categoryTitle,
          UserId: user.id
        }
      }).then(function(category) {
        Hyper.findAll({
          where: {
            username: req.body.username,
            CategoryPageId: category.id
          }
        }).then(function(hypers) {
          res.send(hypers);
        });
      });
    });
  },

  getUserCategories: function (req, res) {
    // now using req.query to access, so params method chaining below is unnecessary
    // var username = req.params[0].split('').slice(10).join('');
    console.log('fetching categories for this user', req.query.username);
    var username = req.query.username;
  /*  User.findOne({
      where
    })*/
  }

};

module.exports = utils;
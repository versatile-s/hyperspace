
var db = require('./db/db').sequelize;
var User = require('./db/db').User;
var Hyper = require('./db/db').Hyper;
var CategoryPage = require('./db/db').CategoryPage;
var bcrypt = require('bcrypt');
var axios = require('axios');

// encrypts password & creates new user in database
var encrypt = function(req, res) {
  var password = req.body.password;

  // generates salt for hashing
  bcrypt.genSalt(10, function(err, salt) {
    // hashes password with salt
    bcrypt.hash(password, salt, function(err, hash) {
      // creates user in database with encrypted password
      User.sync()
        .then(function () {
          return User.create({
            username: req.body.username,
            password: hash
          });
        });
      // sends success response to client
      res.send('User created');
    });
  });
};

var comparePasswords = function(req, res, storedPass) {
  // compares passwords for login
  if (bcrypt.compareSync(req.body.password, storedPass)) {
    // sends success response to client
    res.send('Login successful!');
  } else {
    // sends unsuccessful response to client
    res.status(400).send('Information provided does not match records.');
  }
};

var utils = {
  // USERS
  createUser: function (req, res) {
    User.find({
      where: {
        username: req.body.username
      }
    }).then(function(response) {
      // if username doesn't exist
      if (!response) {
        // creates user
        encrypt(req, res);        
      } else {
        // returns unsuccessful name selection to client
        res.send('Username exists');
      }
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
    db.query('SELECT * FROM Users WHERE username = :username',
      {replacements: {username: req.body.username}, type: db.QueryTypes.SELECT })
      .then(function (results) {
        if (results.length === 1) {
          // if user exists, compare passwords
          comparePasswords(req, res, results[0].password);
        } else {
          res.status(400).send('Username not found');
        }
      });
  },

  // HYPERS (Post request to /link)
  saveHyper: function (req, res) {
    var tags = req.body.tags.replace(/,/g, " ").toLowerCase();
    var userId = 0;
    var hyperId = 0;
    var name = '';
    var hyper = {};
    User.findOne({
      where: {
        username: req.body.username
      }
    }).then(function (user) {
      userId = user.id;
      name = req.body.category || 'home';
      CategoryPage.findOne({
        where: {
          name: name,
          UserId: userId
        }
      }).then(function(category) {
        if (!category) {
          return CategoryPage.create({
            name: name,
            parentCategory: req.body.parents,
            UserId: userId
          }).then(function (category) {
            return Hyper.create({
              url: req.body.url,
              title: req.body.title,
              description: req.body.description,
              image: req.body.image,
              username: req.body.username,
              tags: tags,
              views: 0,
              CategoryPageId: category.id
            }).then(function (newHyper) {
              hyper = newHyper;
              axios.post('localhost:9200/hyperspace/hypers', {
                id: hyper.id,
                url: hyper.url,
                title: hyper.title,
                description: hyper.description,
                tags: tags,
                username: req.body.username,
                CategoryPageId: hyper.CategoryPageId
              }).then(function (response) {
              }).catch(function (err) {
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
            tags: tags,
            views: 0,
            CategoryPageId: category.id
          }).then(function (newHyper) {
            hyper = newHyper;
            axios.post('http://localhost:9200/hyperspace/hypers', {
              id: hyper.id,
              url: hyper.url,
              title: hyper.title,
              description: hyper.description,
              tags: tags,
              username: req.body.username,
              CategoryPageId: hyper.CategoryPageId
            }).then(function (response) {
            }).catch(function (err) {
            });
          });
        }
      });
    });
  },

  searchHypers: function (req, res) {
    var text = req.body.text.replace(/[^\w\s!?]/g,'').toLowerCase().split(' ').join('*,');
    var queryString = '';
    for (var i = 0; i < text.length; i++) {
      if (i === 0 && text.charAt(i) === ',') {
        continue;
      }
      if (i === text.length-1 && text.charAt(i) === ',') {
        continue;
      }
      if (text.charAt(i) === ',' && text.charAt(i+1) === ',') {
        continue;
      }
      if (text.charAt(i) === ',' && (i+1) >= text.length) {
        continue;
      }
      if (text.charAt(i) === ',') {
        queryString += '&';
      } else {
        queryString += text.charAt(i);
      }
    }
    if (req.body.username && req.body.username !== "") {
      var username = req.body.username.toLowerCase();
      axios.get('http://localhost:9200/hyperspace/hypers/_search?q=' + queryString, {
      }).then(function (response) {
        var hits = response.data.hits.hits.filter(function (item) {
          return item._source.username === username;
        });
        res.send(hits);
      }).catch(function (err) {
      });
    } else {
      axios.get('http://localhost:9200/hyperspace/hypers/_search?q=' + queryString, {
      }).then(function (response) {
        var hits = response.data.hits.hits;
        res.send(hits);
      }).catch(function (err) {
        console.log('Error! It\'s sad day! D=', err)
      });
    }
  },

  updateHyper: function (req, res) {
    Hyper.findOne({
      where: {
        username: req.body.username,
        title: req.body.title
      }
    }).then(function(hyper) {
      hyper.update({
        views: req.body.views
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
      }).catch(function(err){
        console.log("server error:",err);
        res.send(err);
      });

   
    });
  },


  getUserCategories: function (req, res) {
    // now using req.query to access, so params method chaining below is unnecessary
    // var username = req.params[0].split('').slice(10).join('');
    var username = req.query.username;
    User.findOne({
      where: {
        username: username
      }
    }).then(function (user) {
      CategoryPage.findAll({
        where: {
          userId: user.id,
        }
      }).then(function(categories) {
        var catArray = [];
        categories.forEach(function (category) {
          catArray.push(category.dataValues.name);
        });
        res.send(JSON.stringify(catArray));
      });
    });
  }
};

module.exports = utils;

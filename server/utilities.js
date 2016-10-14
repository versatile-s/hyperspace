var db = require('./db/db').sequelize;
var User = require('./db/db').User;
var Hyper = require('./db/db').Hyper;
var path = require('path');
var CategoryPage = require('./db/db').CategoryPage;
var bcrypt = require('bcrypt');
var axios = require('axios');
var Friend = require('./db/db').Friend;

// encrypts password & creates new user in database
var encrypt = function(req, res, cb) {
  var password = req.body.password;
  // generates salt for hashing
  bcrypt.genSalt(10, function(err, salt) {
    // hashes password with salt
    bcrypt.hash(password, salt, function(err, hash) {
      // creates user in database with encrypted password
      var username = req.body.username;
      var firstName = req.body.firstName || null;
      var lastName = req.body.lastName || null;
      var photo = req.body.photo || null;
      var email = req.body.email || null;
      User.sync()
        .then(function () {
          return User.create({
            username: username,
            password: hash,
            firstName: firstName,
            lastName: lastName,
            photo: photo,
            email: email
          });
        });
    });
  });
};

var createSession = function(req, res, userInfo) {
  req.session.regenerate(function() {
    req.session.key = userInfo;
    res.send('Login successful!');
  });
};

var comparePasswords = function(req, res, storedPass, userInfo) {
  // compares passwords for login
  if (bcrypt.compareSync(req.body.password, storedPass)) {
    // sends success response to client
    createSession(req, res, userInfo);
  } else {
    // sends unsuccessful response to client
    res.status(400).send('Information provided does not match records.');
  }
};

var getUserId = function (username, cb) {
  User.findOne({
    where: {
      username: username
    }
  }).then(function (user) {
    if (user && user !== undefined) {
      cb(user.id);
    }
  });
};

var getCategoryId = function (userID, category, cb) {
  CategoryPage.findOne({
    where: {
      name: category,
      UserId: userID
    }
  }).then(function (categoryId) {
    cb(categoryId);
  });
};

// returns all hypers for a single category
var getHypers = function (categoryId, cb) {
  Hyper.findAll({
    where: {
      CategoryPageId: categoryId
    }
  }).then(function (hypers) {
    if (hypers.length === 0) {
      cb([]);
    } else {
      cb(hypers);
    }
  });
};

// returns an array of all the tags on a single hyper
var getTags = function (hyperId, cb) {
  var tags = [];
  Hyper.findOne({
    where: {
      id: hyperId
    }
  }).then(function (hyper) {
    tags = tags.concat(hyper.tags.split(' '));
    cb(tags);
  });
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
        // The reason we create keyUsername here in this particular format is because it needs to match
        // the same format that we push into createSession when we login users. (loginUser function)
        var keyUsername = [{ username: req.body.username }];
        createSession(req, res, keyUsername);
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
    if (req.session.key) {
      return true;
    } else {
      return false;
    }
  },

  loginUser: function (req, res) {
    db.query('SELECT * FROM Users WHERE username = :username',
      {replacements: {username: req.body.username}, type: db.QueryTypes.SELECT })
      .then(function (results) {
        if (results.length === 1) {
          // if user exists, compare passwords
          comparePasswords(req, res, results[0].password, results);
        } else {
          res.status(400).send('Username not found');
        }
      });
  },

  logoutUser: (req, res) => {
    req.session.destroy();
    res.status(200).send('logout successful');
  },

  // HYPERS (Post request to /link)
  saveHyper: function (req, res) {
    var tags = req.body.tags.replace(/,/g, " ").toLowerCase();
    var userId = 0;
    var hyperId = 0;
    var name = '';
    var hyper = {};
    var username = req.body.username;

    if (req.body.username) {
      var findBy =
        User.findOne({
          where: {
            username: req.body.username
          }
        });
    } else {
      var findBy =
        User.findOne({
          where: {
            email: req.body.email
          }
        });
    }
    findBy.then(function (user) {
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
          }).then(function (newCategory) {
            return Hyper.create({
              url: req.body.url,
              title: req.body.title,
              description: req.body.description,
              image: req.body.image,
              username: req.body.username,
              tags: tags,
              views: 0,
              CategoryPageId: newCategory.id
            }).then(function (newHyper) {
              axios.post('http://localhost:9200/hyperspace/hypers', {
                id: newHyper.id,
                url: newHyper.url,
                title: newHyper.title,
                description: newHyper.description,
                image: newHyper.image,
                tags: newHyper.tags,
                username: req.body.username,
                CategoryPageId: newHyper.CategoryPageId
              }).then(function () {
              }).catch(function (err) {
                res.send('Error adding to ES');
                console.log('Error! It\'s sad day! D=', err);
              });
            });
          });
        } else {
          Hyper.findOne({
            where: {
              url: req.body.url,
              CategoryPageId: category.id
            }
          }).then(function(previousHyper) {
            if (!previousHyper) {
              return Hyper.create({
                url: req.body.url,
                title: req.body.title,
                description: req.body.description,
                image: req.body.image,
                username: user.username,
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
                  image: hyper.image,
                  tags: tags,
                  username: req.body.username,
                  CategoryPageId: hyper.CategoryPageId
                }).then(function (response) {
                }).catch(function (err) {
                  res.send('Error adding to ES');
                  console.log('Error! It\'s sad day! D=', err);
                });
              });
            }
          });
        }
      });
    });
  },

  searchHypers: function (req, res) {
    var text = req.body.text.replace(/[^\w\s!?]/g, '').toLowerCase().split(' ').join('*,');
    var queryString = '';
    for (var i = 0; i < text.length; i++) {
      if (i === 0 && text.charAt(i) === ',') {
        continue;
      }
      if (i === text.length - 1 && text.charAt(i) === ',') {
        continue;
      }
      if (text.charAt(i) === ',' && text.charAt( i + 1 ) === ',') {
        continue;
      }
      if (text.charAt(i) === ',' && ( i + 1 ) >= text.length) {
        continue;
      }
      if (text.charAt(i) === ',') {
        queryString += '&';
      } else {
        queryString += text.charAt(i);
      }
    }
    queryString = queryString + '&size=50';
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
        res.send('Error searching...');
        console.log('Error! It\'s sad day! D=', err);
      });
    }
  },

  updateHyperViews: function (req, res) {
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

  editHyper: function (req, res) {
    Hyper.findOne({
      where: {
        username: req.body.username,
        title:req.body.oldTitle
      }
    }).then(function(hyper) {
      hyper.update({
        title: req.body.newTitle,
        description: req.body.description,
        image: req.body.image
      }).then(function() {
        res.send("Link Updated");
      });
    });
  },

  removeHyper: function (req, res) {
    Hyper.findOne({
      where: {
        username: req.body.username,
        title: req.body.title
      }
    }).then(function(hyper) {
      var destroyed = hyper;
      hyper.destroy();
      res.send(destroyed);
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
      }).then(function (categoryPage) {
        categoryPage.update({
          name: req.body.newName,
          backgroundUrl: req.body.backgroundUrl,
          headerText: req.body.headerText,
          headerTextBackgroundColor: req.body.headerTextBackgroundColor,
          headerTextColor: req.body.headerTextColor,
          fontSize: req.body.fontSize,
          fontFamily: req.body.fontFamily,
          textAlign: req.body.textAlign,
          searchBar: req.body.searchBar,
          feed: req.body.feed
        }).then(function() {
          res.send(categoryPage);
        });
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

      }).catch(function(err) {
        res.send(JSON.stringify('Error'));
        console.log('Error! It\'s sad day! D=', err);
      });
    }).catch(function(error) {
      res.send(JSON.stringify('Error'));
      console.log('Error! It\'s sad day! D=');
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
          UserId: user.id,
        }
      }).then(function(categories) {
        var catArray = [];
        categories.forEach(function (category) {
          catArray.push(category.name);
        });
        res.send(JSON.stringify(catArray));
      });
    });
  },

  getUserTags: function (req, res) {
    var username = req.query.username;
    Hyper.findAll({
      where: {
        username: username
      }
    }).then(function (hypers) {
      var tagStore = {};
      if (hypers) {
        hypers.forEach(function (hyper) {
          var singleTags = hyper.tags.split(' ');
          singleTags.forEach(function(tag) {
            tagStore[tag] = tag;
          });
        });
        res.send(JSON.stringify(tagStore));
      } else {
        res.send(JSON.stringify({none: none}));
      }
    }).catch(function (err) {
      res.send(JSON.stringify('Start adding tags!'));
      console.log('Error! It\'s sad day! D=', err);
    });
  },

  getCategoryPage: function(req,res) {
    User.findOne({
      where: {
        username: req.body.username
      }
    }).then(function (user) {
      if (user && user.id !== undefined) {
        CategoryPage.findOne({
          where: {
            UserId: user.id,
            name: req.body.title
          }
        }).then(function(category) {
          res.send(category);
        });
      }
    }).catch(function (err) {
      res.send('That user doesn\'t exist');
      console.error('Error! It\'s sad day! D=', err);
    });
  },

  deleteCategoryPage: function (req, res) {
    User.findOne({
      where: {
        username: req.body.username
      }
    }).then(function (user) {
      CategoryPage.findOne({
        where: {
          UserId: user.id,
          name: req.body.title
        }
      }).then(function(categoryPage) {
        var destroyed = categoryPage;
        categoryPage.destroy();
        res.send(destroyed);
      });
    });  
  },

  generateSunburst: function(req, res) {
    console.log('sunburst query: ', req.query);
    if (req && req.query !== undefined) {
      var sun = {};
      var catCount = 0;
      var hyperCount = 0;
      sun.name = req.query.username;
      sun.children = [];
      getUserId(sun.name, function (id) {
        CategoryPage.findAll({
          where: {
            userId: id
          }
        }).then(function (categories) {
          if (categories.length === 0) {
            res.send(JSON.stringify(sun));
          }
          categories.forEach(function (cat) {
            var child = {};
            child.children = [];
            child.name = cat.name;
            getHypers(cat.id, function (allHypers) {
              var storage = {};
              if (allHypers.length === 0) {
                sun.children.push(child);
                if (catCount === categories.length - 1) {
                  res.send(sun);
                } else {
                  catCount++;
                  hyperCount = 0;
                }
              } else {
                allHypers.forEach(function (hyp) {
                  getTags(hyp.id, function (tagsArray) {
                    for (var i = 0; i < tagsArray.length; i++) {
                      storage[tagsArray[i]] === undefined ? storage[tagsArray[i]] = 1 : storage[tagsArray[i]]++;
                    }
                    if (allHypers.length === 0) {
                      child.children.push({name: x, size: 0});
                    } else if (hyperCount === allHypers.length - 1) {
                      for (var x in storage) {
                        child.children.push({name: x, size: storage[x]});
                      }
                      sun.children.push(child);
                      if (catCount === categories.length - 1) {
                        res.send(JSON.stringify(sun));
                      } else {
                        catCount++;
                        hyperCount = 0;
                      }
                    } else {
                      hyperCount++;
                    }
                  });
                });
              }
            });
          });
        }).catch(function (err) {
          res.send(JSON.stringify('Start adding Hypers!'));
          console.log('Error! It\'s sad day! D=', err);
        });
      });
    } else {
      res.send(JSON.stringify('Start adding Hypers!'));
    }
  },

  getFeed: function(req, res) {
    var storage = [];
    var count = 0;
    getUserId(req.body.username, function (userID) {
      Friend.findAll({
        where: {
          userId: userID
        }
      }).then(function (allFriends) {
        if (allFriends && allFriends.length !== 0) {
          allFriends.forEach(function (friend) {
            getUserId(friend.name, function (friendID) {
              CategoryPage.findOne({
                where: {
                  name: friend.category,
                  userId: friendID
                }
              }).then(function (cat) {
                Hyper.findAll({
                  where: {
                    CategoryPageId: cat.id,
                    username: friend.name
                  }
                }).then(function (hypers) {
                  if (hypers && hypers.length !== 0) {
                    storage = storage.concat(hypers);
                  }
                }).then(function () {
                  if ( count === allFriends.length - 1 ) {
                    res.send(JSON.stringify(storage.sort(function(a, b) {
                      return a.createdAt > b.createdAt ? 1 : -1;
                    })));
                  } else {
                    count ++;
                  }
                });
              });
            });
          });
        } else {
          res.send(storage);
        }
      });
    });
  },

  getFriends: function (req, res) {
    User.findOne({
      where: {
        username: req.body.username
      }
    }).then(function (user) {
      Friend.findAll({
        where: {
          UserId: user.id
        }
      }).then(function(friends) {
        if (friends && friends.length !== 0) {
          var friendsArray = [];
          friends.forEach(function(friend) {
            friendsArray.push([friend.name, friend.category]);
          });
          res.send(friendsArray);
        } else {
          res.send('No friends were found!');
        }
      }).catch(function (err) {
        res.send('No friends were found');
        console.log('Error! It\'s sad day! D=', err);
      });
    }).catch(function (err) {
      res.send('No friends were found');
      console.log('Error! It\'s sad day! D=', err);
    });
  },

  addFriend: function (req, res) {
    User.findOne({
      where: {
        username: req.body.username
      }
    }).then(function (user) {
      Friend.create({
        name: req.body.friendName,
        category: req.body.friendCategory,
        UserId: user.id
      }).then(function() {
        res.send('Friend Added!');
      });
    });
  }

};





module.exports = utils;

// var router = require('express').Router();
var utils = require('./utilities');
var path = require('path');

/*********************************/
/*********************************/
           //USERS//
/*********************************/
/*********************************/
module.exports = (router) => {
  router.route('/signup')
    .post(function (req, res) {
      console.log('Received POST at /signup');
      // if (utils.isAuth(req, res)) {
      //   res.redirect('/dashboard');
      //   console.log('redirect to dashboard');
      // }
      utils.createUser(req, res);
    });

  // existing user login
  router.route('/login')
    .post(function (req, res) {
      utils.loginUser(req, res);
    });

  router.route('/logout')
    .get(function (req, res) {
      console.log('YOOOOOO Received GET at /logout');
      utils.logoutUser(req, res);
    });

  router.route('/users')
    .put(function (req, res) {
      console.log('Received PUT at /users');
      utils.updateUser(req, res);
      console.log('User updated');
    });

/*********************************/
/*********************************/
      //CATEGORY PAGES//
/*********************************/
/*********************************/

  router.route('/categoryData')
    .post(function (req, res) {
      console.log('Searching for categoryData');
      utils.getCategoryData(req, res);
    });

  // view category
  router.route('/category')
    .get(function (req, res) {
      console.log('Received GET at /category');
      res.send('Received GET at /category');
    })
  // add category
    .post(function (req, res) {
      console.log('Received POST at /category');
      utils.saveCategoryPage(req, res);
      res.send('Received POST at /category');
    })
  // update a category
    .put(function (req, res) {
      console.log('Received PUT at /category');
      utils.updateCategoryPage(req, res);
      res.send('Received PUT at /category');
    });


  /*********************************/
  /*********************************/
             //TAGS//
  /*********************************/
  /*********************************/
  // get all user tags -- this has been moved to server
/*  router.route('/userTags')
    .get(function (req, res) {
      console.log('Received POST at /addTag');
      utils.getUserTags(req, res);
      res.send('Received POST at /addTag');
    });*/

  /*********************************/
  /*********************************/
             //HYPERS//
  /*********************************/
  /*********************************/
  //This adds the hyper to the database.
  router.route('/link')
    .post(function (req, res) {
      console.log('Youre adding this link:', req.body);
      utils.saveHyper(req, res);
      res.send('Received POST at /link');
    })
    // edit link
    .put(function (req, res) {
      console.log('Received PUT at /link');
      utils.updateHyper(req, res);
      res.send('Received PUT at /link');
    });

  // search links
  router.route('/searchLinks')
    .post(function (req, res) {
      console.log('Received GET at /searchLinks');
      utils.searchHypers(req, res);
    });


  /*********************************/
  /*********************************/
             //PREFERENCES//
  /*********************************/
  /*********************************/
  // view preferences
  router.route('/preferences')
    .get(function (req, res) {
      console.log('Received GET at /preferences');
      res.send('Received GET at /preferences');
    })
    // set preferences
    .put(function (req, res) {
      console.log('Received PUT at /preferences');
      res.send('Received PUT at /preferences');
    });
  /*********************************/
      //Friends
  /*********************************/
  router.route('/addfriend')
    .post(function (req, res) {
      utils.addFriend(req, res);
    });
  router.route('/getfriends')
    .post(function (req, res) {
      utils.getFriends(req, res);
    });  

  /************************************************************/
  //       Authentication routes
  /************************************************************/

  router.route('/logout')
    .get(function (req, res) {
      console.log('Received GET at /logout');
      // req.session.destroy(function() {
      res.redirect('/login');
      // });
    });

  router.get('*/bundle.js', function(req, res) {
    res.sendFile(path.join(__dirname, '../client/bundle.js'));
  });

  //404 Fallback
  router.get('*', function(req, res) {
    // res.status(404).send('404, Sari Gurl');
    // console.log('HELLO THERE!');
    res.sendFile(path.join(__dirname, '../client/index.html' ));
  });
  // return router;
};

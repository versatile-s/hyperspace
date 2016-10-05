// var router = require('express').Router();
var utils = require('./utilities');
var path = require('path');

         // HOMEPAGE //
// router.route('/')
//   .get(function (req, res) {
//     console.log('Received GET at /');
//     // if (utils.isAuth(req, res)) {
//     //   res.redirect('/dashboard');
//     //   console.log('redirect to dashboard');
//     // }
//     // The above is not doing anything at the moment because we are using routers
//     res.send('Received GET at /');
//   });

/*********************************/
/*********************************/
           //USERS//
/*********************************/
/*********************************/
// new user signup

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
    // .get(function (req, res) {
    //   console.log('Received GET at /signup');
    //   if (utils.isAuth(req, res)) {
    //     res.redirect('/dashboard');
    //     console.log('redirect to dashboard');
    //   }
    // });

  // existing user login
  router.route('/login')
    .post(function (req, res) {
      utils.loginUser(req, res);
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
  // add tag to category
  // router.route('/addTag')
  //   .post(function (req, res) {
  //     console.log('Received POST at /addTag');
  //     res.send('Received POST at /addTag');
  //   });

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

  // 404 Fallback
  router.get('*', function(req, res) {
    // res.status(404).send('404, Sari Gurl');
    // console.log('HELLO THERE!');
    res.sendFile(path.join(__dirname, '../client/index.html' ));
  });
  return router;
};

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
      utils.createUser(req, res);
    });

  // existing user login
  router.route('/login')
    .post(function (req, res) {
      utils.loginUser(req, res);
    });

  router.route('/logout')
    .get(function (req, res) {
      utils.logoutUser(req, res);
    });

  router.route('/users')
    .put(function (req, res) {
      utils.updateUser(req, res);
    });
/*********************************/
/*********************************/
      //CATEGORY PAGES//
/*********************************/
/*********************************/
  router.route('/categoryData')
    .post(function (req, res) {
      utils.getCategoryData(req, res);
    });

  // view category

  router.route('/getCategory')
    .post(function(req, res) {
      utils.getCategoryPage(req, res);
    });

  router.route('/deleteCategory')
    .post(function(req, res) {
      utils.deleteCategoryPage(req, res);
    });  
  router.route('/category')
    .get(function (req, res) {
      res.send('Received GET at /category');
    })
  // add category
    .post(function (req, res) {
      utils.saveCategoryPage(req, res);
      res.send('Received POST at /category');
    })
  // update a category
    .put(function (req, res) {
      utils.updateCategoryPage(req, res);
    });

  /*********************************/
  /*********************************/
             //HYPERS//
  /*********************************/
  /*********************************/
  //This adds the hyper to the database.

  router.route('/editLink')
    .post(function (req, res) {
      console.log('Youre updating this link:', req.body);
      utils.editHyper(req, res);
    });
  router.route('/link')
    .post(function (req, res) {
      utils.saveHyper(req, res);
      res.send('Received POST at /link');
    })

    // edit link
    .put(function (req, res) {
      utils.updateHyperViews(req, res);
      res.send('Received PUT at /link');
    });

  // search links
  router.route('/searchLinks')
    .post(function (req, res) {
      utils.searchHypers(req, res);
    });

  router.route('/removeLink')
    .post(function (req, res) {
      utils.removeHyper(req, res);
    });
  /*********************************/
  /*********************************/
             //PREFERENCES//
  /*********************************/
  /*********************************/
  // view preferences
  router.route('/preferences')
    .get(function (req, res) {
      res.send('Received GET at /preferences');
    })
    // set preferences
    .put(function (req, res) {
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

  router.route('/getfeed')
    .post(function (req, res) {
      console.log('Received POST at /getFeed');
      utils.getFeed(req, res);
    });

  /************************************************************/
  //       Authentication routes
  /************************************************************/
  router.route('/logout')
    .get(function (req, res) {
      res.redirect('/login');
    });

  router.get('*/bundle.js', function(req, res) {
    res.sendFile(path.join(__dirname, '../client/bundle.js'));
  });

  //404 Fallback
  router.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../client/index.html' ));
  });
};

var router = require('express').Router();
var utils = require('./utilities');

// homepage
router.route('/')
  .get(function (req, res) {
    console.log('Received GET at /');
    res.send('Received GET at /');
  });

// new user signup
router.route('/signup')
  .post(function (req, res) {
    console.log('Received POST at /signup');
    utils.createUser(req.body.username, req.body.password);
    res.send('User created');
  });

// existing user login
router.route('/login')
  .post(function (req, res) {
    utils.loginUser(req, res);
  });

// view categories
router.route('/categories')
  .get(function (req, res) {
    console.log('Received GET at /categories');
    res.send('Received GET at /categories');
  });

// search categories
router.route('/categories')
  .post(function (req, res) {
    console.log('Received POST at /categories');
    res.send('Received POST at /categories');
  });

// view category
router.route('/category')
  .get(function (req, res) {
    console.log('Received GET at /category');
    res.send('Received GET at /category');
  });

// add category
router.route('/category')
  .post(function (req, res) {
    console.log('Received POST at /category');
    res.send('Received POST at /category');
  });

// remove link from category
router.route('/category')
  .put(function (req, res) {
    console.log('Received PUT at /category');
    res.send('Received PUT at /category');
  });

// add tag to category
router.route('/addTag')
  .post(function (req, res) {
    console.log('Received POST at /addTag');
    res.send('Received POST at /addTag');
  });

// This adds the hyper to the database.
router.route('/link')
  .post(function (req, res) {
    console.log('Youre adding this link:', req.body);
    utils.saveHyper(req, res);
    // ADD THE HYPER TO DATABASE
    res.send('Received POST at /link');
  });

// edit link
router.route('/link')
  .put(function (req, res) {
    console.log('Received PUT at /link');
    res.send('Received PUT at /link');
  });

// search links
router.route('/searchLinks')
  .post(function (req, res) {
    console.log('Received POST at /searchLinks');
    res.send('Received POST at /searchLinks');
  });

// view preferences
router.route('/preferences')
  .get(function (req, res) {
    console.log('Received GET at /preferences');
    res.send('Received GET at /preferences');
  });

// set preferences
router.route('/preferences')
  .put(function (req, res) {
    console.log('Received PUT at /preferences');
    res.send('Received PUT at /preferences');
  });

// 404
router.use('*', function(req, res) {
  res.status(404).send('404, Sari Gurl');
});

module.exports = router;

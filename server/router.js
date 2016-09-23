var router = require('express').Router();

router.use('*', function(req, res) {
  console.log('Router is functioning.');
  res.send('You have reached hyperspace! We\'re not here right now, so please leave a message and we\'ll get back to you as soon as we can. Thanks, bye!');
});

module.exports = router;
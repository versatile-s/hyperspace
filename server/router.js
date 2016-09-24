var router = require('express').Router();

router.get('/', function (req, res) {
  res.send('Oh hi thar ;0');
});

router.use('*', function(req, res) {
  res.send('You have reached hyperspace! We\'re not here right now, so please leave a message and we\'ll get back to you as soon as we can. Thanks, bye!');
});

module.exports = router;
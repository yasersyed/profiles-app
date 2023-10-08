var express = require('express');
var router = express.Router();
var login = require('../controller/authenticate/login');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', function(req, res, next) {
  const userName = req.body.username;
  let loginResult = login(userName, req.body.password);
  console.log(`${userName} & ${req.body.password}`);
  if(loginResult)
  {
    res.render('users', {username: userName});
  }
  else {
    res.render('index', {error: true});
  }
});

router.get('/test', function(req, res, next) {
  res.send('has users');
});

module.exports = router;

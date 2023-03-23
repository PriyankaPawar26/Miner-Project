var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req,res,next){
  res.render('login', { title: 'login' });
});

router.post('/login', function (req, res, next) {
  // console.log(req.body)
  indexmodel.registeruser(req.body, (result) => {
    console.log("Result :", result)
    res.render('login', { msg: 'User login Successfully...'});
  })
});

module.exports = router;

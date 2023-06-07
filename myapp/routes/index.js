var express = require('express');
var router = express.Router();
var indexmodel= require('../models/indexmodel')

/*
Middleware to fetch post images 
*/
var catList 
router.use("/",(req,res,next)=>{
  indexmodel.fetchPost((result)=>{
    console.log(result)
    catList=result
    next()
  })
})


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' ,'catList':catList});
});

router.get('/login', function(req,res,next){
  res.render('login', {msg:'' });
});

router.post('/login', function (req, res, next) {
  // console.log(req.body)
  console.log(req.body)
  indexmodel.userlogin(req.body, (result) => {
    console.log(result)
    if (result.length>0) {


       if (result[0].role=="admin") {
        // res.send("login as a user")
        res.redirect("/admin")
       }
       else{
         if(result[0].role=="hod"){
          res.redirect("/hod")
        }
         else if(result[0].role=="user") {
          // res.send("login as an admin")
          res.redirect("/users")
         }
         else if(result[0].role=="staff") {
          
          res.redirect("/staff")
         }
       }
      
    
    
    } else {
     
      res.render('login', { msg: 'Invalid user or verify your account' })
    }
  })
});

router.get('/register', function (req, res, next) {
  res.render('register', { msg: '' });
});

router.post('/register', function (req, res, next) {
  // console.log(req.body)
  indexmodel.registeruser(req.body, (result) => {
    console.log("Result :", result)
    if (result) {
      res.render('register', { msg: 'User Register Successfully...' });
    } else {
      res.render('register', { msg: 'User already exists Please Register again...' });
    }

  })
});

router.get('/home', function(req,res,next){
  res.render('home')
})

router.post('/home', function (req, res, next) {
  // console.log(req.body)
  
      res.render('home', { msg: 'User Register Successfully...' });
    
});

router.get('/student_post', function(req,res,next){
  res.render('student_post', { title: 'Express' ,'catList':catList})
})


module.exports = router;

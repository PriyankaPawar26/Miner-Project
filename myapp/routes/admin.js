var express = require('express');
var router = express.Router();
var url = require('url')
var path = require('path')
var adminmodel = require("../models/adminmodel");
const { route } = require('.');




/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('adminHome', { msg:''});
});


/*
Middleware function to authenticate admin users
*/




router.get('/managestaff', function (req, res, next) {
  adminmodel.fetchusers((result)=>{
      console.log(result)
      res.render('managestaff', { msg: '','userDetails':result });
  })
  
});

router.get('/managestaffstatus', function (req, res, next) {
  // console.log(result)
  sDetails = url.parse(req.url, true).query
  console.log(sDetails)
  adminmodel.managestaffstatus(sDetails, (result) => {
      console.log(result)
      res.redirect('/admin/managestaff')
  })
});


router.get('/addstaff', function(req,res,next){
  res.render('addstaff',{title:'addstaff'})
})



router.get('/courses', function (req, res, next) {
  adminmodel.fetchCourse((result)=>{
      console.log(result)
      res.render('courses', { msg: '','courseDetails':result });
  })
  });

  router.get('/manageCourse', function (req, res, next) {
    // console.log(result)
    cDetails = url.parse(req.url, true).query
    console.log(cDetails)
    adminmodel.managesCourse(cDetails, (result) => {
        console.log(result)
        res.redirect('/admin/courses')
    })
  });


router.get('/notifystaff', function(req,res,next){
  res.render('notifystaff', { title: 'notifystaff' });
});

router.get('/notifystudent', function(req,res,next){
  res.render('notifystudent', { title: 'notifystudent' });
});

router.get('/session', function(req,res,next){
  res.render('session', { title: 'session' });
});

router.get('/subjects', function(req,res,next){
  res.render('subjects', { title: 'subjects' });
});

/*
Middleware function to fetch user details for update
*/
var userDetails
router.use((req, res, next) => {
    var sunm = req.session.sunm
    adminmodel.fetchUserDetails(sunm,(result)=>{
       userDetails=result[0]
       next()
    })
})

router.get('/updateprofile', function(req,res,next){
  res.render('updateprofile', { msg: '','userDetails':userDetails, 'sunm': req.session.sunm });
});

router.post('/updateprofile', function (req, res, next) {
  adminmodel.uepadmin(req.body,(result)=>{
      res.redirect("/admin/updateprofile")
  })
});

router.get('/viewattendence', function(req,res,next){
  res.render('viewattendence', { title: 'viewattendence' });
});

var clist
router.use('/upload',(req,res,next)=>{
    adminmodel.fetchAll('category',(result)=>{
        console.log(result)
        clist=result
        next()
    })
})

var catList 
router.use("/",(req,res,next)=>{
  adminmodel.fetchPost((result)=>{
    console.log(result)
    catList=result
    next()
  })
})

router.get('/upload', function (req, res, next) {
  res.render('upload', {'catList':catList, msg: '' , 'clist':clist,});
});


router.post('/upload', function (req, res, next) {
  console.log(req.body)
  var catnm = req.body.catnm
  var subcatnm = req.body.subcatnm
  var caticon = req.files.caticon
  var filename =Date.now() + "-" + caticon.name
  console.log(filename)
  var destinationpath = path.join(__dirname,"../public/uploads",filename)
  console.log(destinationpath) 
  adminmodel.upload(catnm,subcatnm,filename,(result)=>{
      if (result) {
          caticon.mv(destinationpath)
          res.render('upload',{'msg':'photo added successfully.....','clist':clist,'catList':catList})
      }else{
          res.render('upload',{'msg':'photo already exists, please add new category.....','clist':clist,'catList':catList})
      }
  })
});

router.get('/add_course',(req,res,next)=>{
  res.render('add_course',{msg:''})
})
router.post('/add_course', function (req, res, next) {
  // console.log(req.body)
  adminmodel.addcourse(req.body, (result) => {
    console.log("Result :", result)
    if (result) {
      res.render('add_course', { msg: 'Course added Successfully...' });
    } else {
      res.render('add_course', { msg: 'Course already ....' });
    }

  })
});



router.get('/add_student', (req,res, next)=>{
  res.render('add_student',{msg:''})
})

router.post('/add_student', function(req,res,next){
  adminmodel.addstudent(req.body, (result) => {
    console.log("Result :", result)
    if (result) {
      res.render('add_student', { msg: 'Student added Successfully...' });
    } else {
      res.render('add_student', { msg: 'Student already ....' });
    }

  })
})



router.get('/show_student', function (req, res, next) {
  adminmodel.fetchBtechStd((result)=>{
      console.log(result)
      res.render('show_student', { msg: '','stdDetails':result });
  })
  });

  router.get('/manageStudent', function (req, res, next) {
    // console.log(result)
    stdDetails = url.parse(req.url, true).query
    console.log(stdDetails)
    adminmodel.manageStudent(stdDetails, (result) => {
        console.log(result)
        res.redirect('/admin/show_student')
    })
  });


  


module.exports = router;

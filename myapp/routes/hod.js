var express = require('express');
var router = express.Router();
var url = require('url')
var path = require('path')
var hodmodel = require("../models/hodmodel");


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('hodhome', { msg:'' });
});

/*
Middleware function to authenticate admin users
*/





router.get('/hod_managestaff', function (req, res, next) {
  hodmodel.fetchusers((result)=>{
      console.log(result)
      res.render('hod_managestaff', { msg: '','userDetails':result });
  })
  
});
router.get('/managestaffstatus', function (req, res, next) {
  // console.log(result)
  sDetails = url.parse(req.url, true).query
  console.log(sDetails)
  hodmodel.managestaffstatus(sDetails, (result) => {
      console.log(result)
      res.redirect('/hod/hod_managestaff')
  })
});

router.get('/hod_timetable', function(req,res,next){
  res.render('hod_timetable',{title:'addstaff'})
})

router.get('/courses', function(req,res,next){
  res.render('courses', {title:'coures'})
})



router.get('/hod_notifystaff', function(req,res,next){
  res.render('hod_notifystaff', { title: 'notifystaff' });
});

router.get('/hod_notifystudent', function(req,res,next){
  res.render('hod_notifystudent', { title: 'notifystudent' });
});

router.get('/hod_managestudent', function(req,res,next){
  // res.render('hod_managestudent', { title: 'session' });
  hodmodel.fetchBtechStd((result)=>{
    console.log(result)
    res.render('hod_managestudent', { msg: '','stdDetails':result });
})
});

 router.get('/manageStudent', function (req, res, next) {
    // console.log(result)
    stdDetails = url.parse(req.url, true).query
    console.log(stdDetails)
    hodmodel.manageStudent(stdDetails, (result) => {
        console.log(result)
        res.redirect('/hod/hod_managestudent')
    })
  });


  

router.get('/hod_managesubject', function(req,res,next){
  res.render('hod_managesubject', { title: 'subjects' });
});

// router.get('/updateprofile', function(req,res,next){
//   res.render('updateprofile', { title: 'updateprofile' });
// });

router.get('/hod_viewattendence', function(req,res,next){
  res.render('hod_viewattendence', { title: 'viewattendence' });
});

var clist
router.use('/upload',(req,res,next)=>{
    hodmodel.fetchAll('category',(result)=>{
        console.log(result)
        clist=result
        next()
    })
})


router.get('/upload', function (req, res, next) {
  res.render('upload', { msg: '' , 'clist':clist});
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
  hodmodel.upload(catnm,subcatnm,filename,(result)=>{
      if (result) {
          caticon.mv(destinationpath)
          res.render('upload',{'msg':'Sub Category added successfully.....','clist':clist})
      }else{
          res.render('upload',{'msg':'Sub Category already exists, please add new category.....','clist':clist})
      }
  })
});




  
module.exports = router;

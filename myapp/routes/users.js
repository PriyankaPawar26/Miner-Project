var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('student_home', {msg:''})
});

router.get('/std_assignment', function(req,res,next){
  res.render('std_assignment',{msg:''})
})

router.get('/std_syllabus', function(req,res,next){
  res.render('std_syllabus',{msg:''})
})

router.get('/std_timetable', function(req,res,next){
  res.render('std_timetable',{msg:''})
})

router.get('/std_viewattendence', function(req,res,next){
  res.render('std_viewattendence',{msg:''})
})

router.get('/std_profile', function(req,res,next){
  res.render('std_profile',{msg:''})
})

router.get('/std_notification', function(req,res,next){
  res.render('std_notification',{msg:''})
})

router.get('/std_mstmarks', function(req,res,next){
  res.render('std_mstmarks',{msg:''})
})

router.get('/std_chat', function(req,res,next){
  res.render('std_chat',{msg:''})
})
module.exports = router;

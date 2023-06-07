var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('staffhome', {msg:''})
  });
  
  router.get('/staff_viewattendence', function(req, res, next) {
    res.render('staff_viewattendence', {msg:''})
  });

  router.get('/staff_attendence', function(req, res, next) {
    res.render('staff_attendence', {msg:''})
  });
  
  router.get('/staff_editresult', function(req, res, next) {
    res.render('staff_editresult', {msg:''})
  });

  router.get('/staff_notification', function(req, res, next) {
    res.render('staff_notification', {msg:''})
  });

  router.get('/staff_timetable', function(req, res, next) {
    res.render('staff_timetable', {msg:''})
  });

  router.get('/staff_addresult', function(req, res, next) {
    res.render('staff_addresult', {msg:''})
  });

  router.get('/staff_addassignment', function(req, res, next) {
    res.render('staff_addassignment', {msg:''})
  });
  module.exports = router;
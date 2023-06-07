var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fileupload = require('express-fileupload')
var session = require('express-session')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');
var hodRouter = require('./routes/hod');
var staffRouter =require('./routes/staff')


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileupload())
// app.use(session({ 'secret': 'My Name is Videh Jaiswal', saveUninitialized: true, resave: false, cookie: { expires: 1000 } }))
app.use(session({ 'secret': 'My Name is priyanka pawar', saveUninitialized: true, resave: false }))


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter)
app.use('/hod',hodRouter)
app.use('/staff', staffRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(8020,()=>{
  console.log("server is listrning on port 8020")
})

module.exports = app;

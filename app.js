var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');
const UserRouter = require('./routes/User/User');
const AdminRouterCategory = require('./routes/Admin/Category');
const AdminRouterProduct = require('./routes/Admin/Product');
const UserRouterOrder =require('./routes/User/Order');
const ConnectMongoDB = async () =>{
  try{
   
    mongoose.connect('mongodb://localhost:27017/shop-nodejs',{useNewUrlParser: true,useUnifiedTopology: true});
      console.log("ket noi thanh cong");
  }catch(err){
      console.log("ket noi csdl loi :"+err);
  }
};
ConnectMongoDB();
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
//app.use('/users', usersRouter);
app.use('/users',UserRouter.router);
app.use('/adminCategory',AdminRouterCategory);
app.use('/adminProduct',AdminRouterProduct);
app.use('/usersOrder',UserRouterOrder);
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

module.exports = app;

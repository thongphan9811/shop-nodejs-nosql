var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const indexRouter = require('./routes/index');
const schedule = require('node-schedule');
const UserRouter = require('./routes/User/User');
const AdminRouterCategory = require('./routes/Admin/Category');
const AdminRouterProduct = require('./routes/Admin/Product');
const UserRouterOrder = require('./routes/User/Order');
const RateRouter = require('./routes/User/rating');
const likeRoter = require('./routes/User/like');
const viewModel = require('./models/view');
const reportModel = require('./models/report');
const productModel = require('./models/Product');
const ConnectMongoDB = async () => {
  try {

    mongoose.connect('mongodb://localhost:27017/shop-nodejs', { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("ket noi thanh cong");
  } catch (err) {
    console.log("ket noi csdl loi :" + err);
  }
};
ConnectMongoDB();

const hello = async () => {
  const rule = new schedule.RecurrenceRule();
  rule.dayOfWeek = [0, new schedule.Range(1, 6)];
  rule.hour = 24;
  rule.minute = 0;
  await schedule.scheduleJob(rule, async function () {
    const arrPro = [];
    const Time = new Date();
    const Idpro = await productModel.find({});
    await Idpro.forEach(x => {
      arrPro.push(x._id);
    })
    console.log(arrPro);
    await arrPro.forEach(id => {
      viewModel.count({ product: id }, async function (err, count) {
        try {
          if (count == 0) {
            const ck = await reportModel.findOne({ product: id });// tìm  xem đã có product trong bài report chưa
            if (!ck) {
              const reportClass = new reportModel({ product: id, Time: Time.getMonth() + Time.getFullYear() });// nếu chưa thì tạo mới 
              const newRe = await reportClass.save();
            }
          } else {
            const ckup = await reportModel.findOne({ product: id }); // tìm  xem đã có product trong bài report chưa
            if (!ckup) {
              const reportClass = new reportModel({ product: id, views: count, Time: Time.getMonth() + Time.getFullYear() });
              const newRe = await reportClass.save(); // lưu report và view trong tháng
            }
            const UpRe = await reportModel.updateOne({ product: id }, { views: count }); // cập nhât report trong th
          }
        } catch (err) {
          console.log(err);
          return;
        }
      })
    })
  });
}
hello();
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
app.use('/users', UserRouter.router);
app.use('/adminCategory', AdminRouterCategory);
app.use('/adminProduct', AdminRouterProduct);
app.use('/usersOrder', UserRouterOrder);
app.use('/rate', RateRouter);
app.use('/like', likeRoter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

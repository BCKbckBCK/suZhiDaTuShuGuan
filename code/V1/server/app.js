var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var cors=require('cors');
var fn = require('./dao/fn');
var multer  = require('multer');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var borrowingListRouter = require('./routes/borrowingList');//图书借阅排行展示
var borrowingCountRouter = require('./routes/borrowingCount');//借阅量数据展示
var libraryPeopleCountRouter = require('./routes/libraryPeopleCount');//到馆人数统计
var aboutLibraryRouter = require('./routes/aboutLibrary');//本馆风采展示
var todayRecommendRouter = require('./routes/todayRecommend');//今日推荐
var noticeRouter = require('./routes/notice');//通知公告（活动预告）
var readerStarRouter = require('./routes/readerStar');//阅读之星
var permissions = require('./routes/permissions');//权限相关
var log = require('./routes/log');//日志
var upload = require('./routes/upload');//上传
var setting = require('./routes/setting');//设置信息
var shellScript = require('./routes/shellScript');//自动脚本
const bodyParser = require('body-parser');


var app = express();


//设置跨域访问
 app.all('*', function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//   res.header("X-Powered-By",' 3.2.1');
//   res.header("Content-Type", "application/json;charset=utf-8");
   fn.insertActionLog(req);
   next();
 });


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  secret: 'shhhh, very secret'
}));
//下面这三行，就是为了解决req.body没有值的问题
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 配置跨域模块  
//     允许哪个程序跨域访问服务器
//     脚手架：8080
//     服务器：3000
app.use(cors({
  //允许程序列表
  origin:["http://127.0.0.1:8080","http://localhost:8080",'http://172.21.8.215','http://172.21.8.215:80'],
  credentials:true,
}))

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/borrowing-list', borrowingListRouter);//图书借阅排行展示
app.use('/borrowing-count', borrowingCountRouter);//借阅量数据展示
app.use('/library-people-count', libraryPeopleCountRouter);//到馆人数统计
app.use('/about-library', aboutLibraryRouter);//本馆风采展示
app.use('/today-recommend', todayRecommendRouter);//今日推荐
app.use('/notice', noticeRouter);//通知公告（活动预告）
app.use('/reader-star', readerStarRouter);//阅读之星
app.use('/permissions', permissions);//权限相关
app.use('/log', log);//日志
app.use('/upload', upload);//上传
app.use('/setting', setting);//设置信息

app.use('/shell-script', shellScript);//shellScript shell脚本

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

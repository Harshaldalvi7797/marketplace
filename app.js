require("dotenv").config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require("mongoose")


var app = express();

var userAuth = require("./routes/auth/Userauth")
var forgetPassword = require("./routes/forget.password")
var mailer = require("./routes/mailer")

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



//All API
app.use('/users', userAuth);
app.use('/users', mailer);
app.use('/users', forgetPassword);




// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'locals' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});




//port
const PORT = process.env.PORT || 5000
//starting server
app.listen(PORT, () => {
  console.log(`App is  running on ${PORT}`)
})



//databse connection
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
  .then(() => {
    console.log("Database conneced successfully")

  })
  .catch((err) => {
    console.log(err)

  })


module.exports = app;

let createError = require('http-errors');
let express = require('express');
let cookieParser = require('cookie-parser');
const {configMailService} = require('email-only-auth'); //  import method from email-only-auth package

let usersRouter = require('./routes/users');

//  sample constant values--------EMAIL-ONLY-AUTH -----------------
let isLocal = false;  //  true for local SMTP connection, false for configure our SMTP connection.

//  creating configuration data for SMTP connection in nodemailer.
//  more information please visit nodemailer and sendinblue.com.
const mailConfig = {
    host:'smtp-relay.sendinblue.com',
    port:587,
    secure:false,
    auth:{
      user:'*********@gmail.com',
      pass:'*************'
    }
}
  const mailConfiguration = async () => {
    const result = await configMailService(isLocal,mailConfig);
    console.log(result);
  }
//  sample constant values------------EMAIL-ONLY-AUTH-------------


let app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//  sample constant values--------EMAIL-ONLY-AUTH -----------------
mailConfiguration();
//  sample constant values--------EMAIL-ONLY-AUTH -----------------

app.use('/users', usersRouter);

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

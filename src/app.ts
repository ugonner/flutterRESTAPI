import { Express, NextFunction, Request, Response } from "express";



//const session = require('express-session')
const createError  = require('http-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const express = require('express')
const IndexRouter = require("./routes/index")

const app: Express = express();



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//app.use(express.session({secret: "authorssite"}))

app.use(cookieParser());

app.use('/', IndexRouter);

// catch 404 and forward to error handler
app.use(function(req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});

// error handler
app.use(function(err: any, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


app.listen(3000, () => { console.log("listening")})

module.exports = app;

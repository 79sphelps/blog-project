'use strict';

const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const passport = require('passport');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

require('./app_api/models/db');

require('./app_api/config/passport');

const HOST_IP = '192.168.0.32';
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://' + HOST_IP + ':4200');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
  });

const postRoutes = require('./app_api/routes/posts.routes');
const userRoutes = require('./app_api/routes/user.routes');

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(cookieParser());

app.use(cors());

app.use(passport.initialize());

app.use('/api', postRoutes);
app.use('/api', userRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// [SH] Catch unauthorised errors
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({"message" : err.name + ": " + err.message});
  }
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

// #

app.listen(3000, () => console.log('server running'));
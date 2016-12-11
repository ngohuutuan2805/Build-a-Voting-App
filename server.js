/**
 * Created by NgoHuuTuan on 12/11/16.
 */

'use strict';

var express = require('express');
var routes = require('./app/routes/index.js');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');

var app = express();

// initialize the dotenv Node module, which will add our GitHub API information from .env to the Node process.env object.
require('dotenv').load();

require('./app/config/passport')(passport);



mongoose.connect(process.env.MONGO_URI);
mongoose.Promise = global.Promise;

app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
app.use('/public', express.static(process.cwd() + '/public'));
app.use('/common', express.static(process.cwd() + '/app/common'));

app.use(session({
    secret: 'secretClementine',
    resave: false,
    saveUninitialized: true
}));


/*
 *
 * 	passport.initialize is required by Passport in order to initialize the Passport application.
 * 	Similar to the Express initialization, this will instantiate the Passport functionality.
 * 	Additionally, we use the passport.session() middleware to enable the usage of session storage.
 *
 * */

app.use(passport.initialize());
app.use(passport.session());

routes(app, passport);

var port = process.env.PORT || 8080;
app.listen(port,  function () {
    console.log('Node.js listening on port ' + port + '...');
});


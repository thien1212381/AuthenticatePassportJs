var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var db = require('./application/model/db');
var User = require('./application/model/user');
var passport = require('passport');
var flash = require('connect-flash');
var session = require('express-session');
require('./passport')(passport);

//server start
var server = app.listen(3000);

//config
app.set('view engine','ejs');
app.set('views','application/view');
app.use(session({ secret: 'applicationnodejs' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//routers
var routers = require('./router');
routers(app,passport);
app.use(routers);

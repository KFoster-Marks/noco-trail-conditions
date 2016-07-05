'use strict';

require('dotenv').load();

var express = require('express');
var path = require('path');
var bcrypt = require('bcrypt');
var bodyParser = require('body-parser');
var cookieSession = require('cookie-session');
var logger = require('morgan');
var pg = require('pg');
var port = 3000;


var app = express();

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieSession({
  name: 'session',
  keys: [process.env['KEY']]
}));

app.get('/', function(req, res) {
  console.log('Hello world!');
  res.send('hello, world');
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Listening on port " + port);
});

module.exports = app;

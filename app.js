'use strict';

require('dotenv').load();

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var methodOverride = require('method-override');

var pg = require('pg');

pg.defaults.ssl = true;
pg.connect(process.env.DATABASE_URL, function(err, client) {
  if (err) throw err;
  console.log('Connected to postgres! Getting schemas...');

  client
    .query('SELECT table_schema,table_name FROM information_schema.tables;')
    .on('row', function(row) {
      console.log(JSON.stringify(row));
    });
});

require('dotenv').load();


var index = require('./routes/index');
var users = require('./routes/users');
var trails = require('./routes/trails');

var app = express();

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(methodOverride('_method'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(cookieSession({
  name: 'session',
  keys: [
    process.env.SESSION_KEY1,
    process.env.SESSION_KEY2,
    process.env.SESSION_KEY3
  ]
}));

app.use(function(req, res, next) {
  res.locals.session = req.session;
  console.log(res.locals.session);
  next();
});

app.use('/', index);
app.use('/users', users);
app.use('/trails', trails);



var port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log("Listening on port " + port);
});

module.exports = app;

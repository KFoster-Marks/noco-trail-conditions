'use strict';

var express = require('express');
var app = express();
var router = express.Router();
var port = 3000;

router.get('/', function(req, res) {
  console.log('Hello world!');
  res.send('hello, world');
});

app.listen(port, function() {
  console.log('listening on port' + port);
});

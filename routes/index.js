'use strict';

var express = require('express');
var app = express();
var router = express.Router();

router.get('/', function(req, res) {
  res.render('index');
});


module.exports = router;

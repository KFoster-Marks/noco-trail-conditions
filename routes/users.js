'use strict';

var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var bcrypt = require('bcrypt');

router.get('/', function(req, res) {
  var info = {};
  res.render('createUser', {info: info});
});


router.post('/', function(req, res) {
  var info = {
    user: req.body.user.username,
    hasError: false
  };
  info.error = {};
  checkPassword(req, info);

  if (info.hasError) {
    console.log(info.error.password);
    res.render('createUser', {info: info});
  } else {
    console.log("There was no error!");
    // bcrypt.genSalt(Number(req.body.saltRounds), function(err, salt) {
    //     bcrypt.hash(req.body.user.password, salt, function(err, hash) {
    //
    //       knex('users').insert({
    //         name: req.body.user.name,
    //         email: req.body.user.email,
    //         city:req.body.user.city,
    //         favorite_trail:req.body.user.favorite_trail,
    //         username: req.body.user.username,
    //         password: hash
    //
    //       }).returning('id')
    //
    //         .then(function(id) {
    //           req.session = {};
    //           req.session.id = id;
    //           req.session.username = req.body.user.username;
    //           console.log(req.session);
    //           res.redirect('/');
    //
    //         }).catch(function(err) {
    //         console.error(err);
    //         res.sendStatus(500);
    //       });
    //     });
    //   });
  }
});

function checkPassword(req, info) {
  console.log('entered checkPassword function');
  info.password = req.body.user.password;
  info.error.password = [];
  if(req.body.user.password.length <= 3) {
    info.hasError = true;
    info.error.password.push({message: "Password should be 4 or more characters."});
  }
  var regex = /[A-Za-z]/;
  if (!req.body.user.password.match(regex)) {
    info.hasError = true;
    info.error.password.push({message: "Password must contain at least one letter."});
  }
  var regex = /\W/g;
  if (!req.body.user.password.match(regex)) {
    info.hasError = true;
    info.error.password.push({message: "Password must contain at least one special character."});
  }
}


// LOGIN ROUTES //
router.get('/login', function(req, res) {
  //declare info object here to enable error message below; ejs won't recognize info object otherwise.
  var info = {
    user: null
  };
  res.render('login', {info: info});
});

router.post('/auth', function(req, res, next) {
  var info = {
    user: req.body.user.username,
  };

  knex('users').select('username', 'password', 'id').where({
    username: req.body.user.username
  }).then(function(data) {
    if (data.length === 1) {
      bcrypt.compare(req.body.user.password, data[0].password, function(err, result) {
        if (result) {
          req.session = {};
          req.session.id = data[0].id;
          req.session.username = data[0].username;
          res.redirect('/');
        } else {
          //if password and username don't match
          info.noMatch = true;
          res.render('login', {
            info: info
          });
        }
      });
    }
    else {
      //if the username doesn't exist in database
      info.userDoesNotExist = true;
      res.render('login', {
        info: info
      });
    }
  }).catch(next);

});

// UPDATE PROFILE ROUTES //



// LOGOUT ROUTE //
router.get('/logout', function(req, res) {
  req.session = null;
  res.redirect('/');
});

// DELETE PROFILE //
router.get('/delete', function(req, res) {
  res.render('delete');
});

router.delete('/delete', function(req, res) {
  console.log('entered delete function');
  knex('users').delete().where({id: req.session.id}).then(function(data) {
    console.log(data);
    req.session = null;
    res.redirect('/');
  }).catch(function(err) {
    console.log(err);
    res.sendStatus(500);
  });
});

module.exports = router;

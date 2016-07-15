'use strict';

var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var bcrypt = require('bcrypt');






// LOGOUT ROUTES //
router.get('/logout', function(req, res) {
  console.log("entered logout route");
  req.session = null;
  res.redirect('/');
});

// DELETE PROFILE //
router.get('/delete', function(req, res) {
  res.render('delete');
});

router.delete('/delete', function(req, res) {
  console.log('entered delete function');
  knex('users').delete().where({id: JSON.parse(req.session.id)}).then(function(data) {
    console.log(data);
    req.session = null;
    res.redirect('/');
  }).catch(function(err) {
    console.log(err);
    res.sendStatus(500);
  });
});

// CREATE USER ROUTES & FUNCTIONS //
router.get('/', function(req, res) {
  var info = {};
  res.render('createUser', {info: info});
});

router.post('/', function(req, res) {
  var info = {
    user: req.body.user.username,
    passwordError: false,
    userExists: false,
    existError: "That username or email already exists in our system"
  };
  info.error = {};
  checkPassword(req, info);
  exists(req.body.user.username, req.body.user.email).then(function(result) {
    if (info.passwordError) {
      res.render('createUser', {info: info});
    } else if (result.length >= 1) {
        info.userExists = true;
        console.log(info);
        res.render('createUser', {info:info});
    } else {
      bcrypt.genSalt(Number(req.body.saltRounds), function(err, salt) {
          bcrypt.hash(req.body.user.password, salt, function(err, hash) {

            knex('users').insert({
              name: req.body.user.name,
              email: req.body.user.email,
              city:req.body.user.city,
              favorite_trail:req.body.user.favorite_trail,
              username: req.body.user.username,
              password: hash

            }).returning('id')
              .then(function(id) {
                req.session = {};
                req.session.id = id;
                req.session.username = req.body.user.username;
                console.log(req.session);
                res.redirect('/');

              }).catch(function(err) {
              console.error(err);
              res.sendStatus(500);
            });
          });
        });
    }
  });
});

function exists(username, email) {
  return knex.select('username', 'email').from('users').where({username: username}).orWhere({email: email});
}

function checkPassword(req, info) {
  console.log('entered checkPassword function');
  info.password = req.body.user.password;
  info.error.password = [];
  if(req.body.user.password.length <= 3) {
    info.passwordError = true;
    info.error.password.push({message: "Password should be 4 or more characters."});
  }
  var regex = /[A-Za-z]/;
  if (!req.body.user.password.match(regex)) {
    info.passwordError = true;
    info.error.password.push({message: "Password must contain at least one letter."});
  }
  var regex = /\W/g;
  if (!req.body.user.password.match(regex)) {
    info.passwordError = true;
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

router.get('/:id', function(req, res) {
  knex('conditions')
  .join('trails', {'trails.id': 'conditions.trail_id'})

  .join('users', {'users.id': 'conditions.user_id'})
  .select('users.id AS id', 'users.name AS name', 'trails.name AS trail_name', 'conditions.id AS condition_id', 'email', 'city', 'favorite_trail', 'comment', 'creation_date', 'username')

  .where({user_id: req.params.id})
  .orderBy('creation_date', 'desc')
    .then(function(data) {
      console.log(data);
      res.status(200).render('showUser', {user:data[0], trails:data});
    }).catch(function(err){
      //console.error(err);
      res.sendStatus(500);
    });
});


// UPDATE PROFILE ROUTES //
router.get('/edit/:id', function(req, res) {
  knex('users').select().where({id: req.params.id}).then(function(data){
    res.status(200).render('editUser', {user:data[0]});
  }).catch(function(err){
    console.error(err);
    res.sendStatus(500);
  });
});

router.put('/edit/:id', function(req, res) {
  knex('users').where('id', req.params.id).update({
    name: req.body.user.name,
    email: req.body.user.email,
    city:req.body.user.city,
    favorite_trail:req.body.user.favorite_trail,
    username: req.body.user.username,
  }).returning('id')
    .then(function(id) {
      res.redirect('/');
    }).catch(function(err) {
    console.error(err);
    res.sendStatus(500);
  });
});



module.exports = router;

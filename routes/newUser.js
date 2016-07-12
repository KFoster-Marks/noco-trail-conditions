'use strict';

var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var bcrypt = require('bcrypt');

router.post('/', function(req, res) {
  var info = {
    user: req.body.user.username,
    hasError: false
  };
  info.error = {};
  //checkPassword(req, info);
  userExistsInDatabase(req.body.user.username, req, info).then(function(result) {
    if (result) {
      //console.log(info.error);
      console.log('it works!!!');
      res.render('createUser', {info: info});
    } else {
      console.log("There was no error!");
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

//// CHECK IF THE USER EXISTS START /////
function userExistsInDatabase(username, req, info) {
    console.log(username);
    exists(username).then(function(result) {

      if(result.length >= 1) {
        console.log('The user already exists in our database');
        info.hasError = true;
        //something needs to be returned here
        return info.hasError;
      } else {
        console.log('This user does not exist in our database');
        //something needs to be returned here
        return info.hasError;
      }
    });
}

function exists(username) {
  return knex.select('*').from('users').where({username: username});
}

// END CHECK IF USER EXISTS /////

module.exports = router;

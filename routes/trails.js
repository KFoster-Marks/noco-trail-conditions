'use strict';

var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var moment = require('moment');
moment().format();


// SHOW TRAIL //

router.get('/', function(req, res) {
    knex.select().table('trails').then(function(data) {
        res.render('showAllTrails', {
            trails: data
        });
    });
});

// JOIN USER TABLE INTO TWO BELOW TO DISPLAY USER NAME FOR EACH COMMENT //

router.get('/:id', function(req, res) {
    knex.select('*').from('trails').fullOuterJoin('conditions', 'trails.id', 'conditions.trail_id').where({
        trail_id: req.params.id
    }).then(function(data) {
        res.status(200).render('showSingleTrail', {
            trail: data[0],
            trails: data
        });
    }).catch(function(err) {
      res.sendStatus(500);
    });
});



router.get('/:id/new', function(req, res) {
    res.render('newTrailCondition', {id: req.params.id});
});

router.post('/:id', function(req, res) {

  knex('conditions').insert({
    trail_id: req.params.id,
    user_id: JSON.parse(req.session.id),
    comment: req.body.condition.comment,
    creation_date: new Date()
  })
  .then(function(data){
    console.log(data);
    res.redirect('/' + req.params.id);
  })
  .catch(function(err) {
  res.sendStatus(500);
});
});








module.exports = router;

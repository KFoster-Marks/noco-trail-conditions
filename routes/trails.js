'use strict';

var express = require('express');
var router = express.Router();
var knex = require('../db/knex');


// SHOW TRAIL //

router.get('/', function(req, res) {
    knex.select().table('trails').then(function(data) {
        console.log(data);
        res.render('showAllTrails', {
            trails: data
        });
    });
});

router.get('/:id', function(req, res) {
    knex.select('*').from('trails').fullOuterJoin('conditions', 'trails.id', 'conditions.trail_id').where({
        trail_id: req.params.id
    }).then(function(data) {
      console.log(data);
        res.status(200).render('showSingleTrail', {
            trail: data[0],
            trails: data
        });
    }).catch(function(err) {
      console.error(err);
      res.sendStatus(500);
    });
});


router.get('/:id/new', function(req, res) {
    res.render('newTrailCondition', {id: req.params.id});
});

router.post('/:id', function(req, res) {
  console.log('**************');
  console.log(req.params.id);
  knex('conditions').insert({
    trail_id: req.params.id,
    comment: req.body.condition.comment,
    creation_date: new Date()
  })
  .then(function(data){
    res.redirect('/');
  })
  .catch(function(err) {
  console.error(err);
  res.sendStatus(500);
});
});








module.exports = router;

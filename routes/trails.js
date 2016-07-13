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
            trail: data[0]
        });
    }).catch(function(err) {
      console.error(err);
      res.sendStatus(500);
    });
});








router.get('/new', function(req, res) {
    res.render('newTrailCondition');
});




module.exports = router;

'use strict';

var express = require('express');
var router = express.Router();
var knex = require('../db/knex');


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
    knex('conditions')
        .join('trails', {
            'trails.id': 'conditions.trail_id'
        })
        .join('users', {
            'users.id': 'conditions.user_id'
        })
        .select('trails.id AS id', 'trails.name AS name', 'comment', 'creation_date', 'username', 'trail_length', 'description', 'elevation_gain')
        .where({
            trail_id: req.params.id
        })
        .orderBy('creation_date', 'desc')
        .limit(3)
        .then(function(data) {
            console.log(data);
            res.status(200).render('showSingleTrail', {
                trail: data[0],
                trails: data
            });
        }).catch(function(err) {
            //console.log(err);
            res.sendStatus(500);
        });
});


router.get('/:id/new', function(req, res) {
    res.render('newTrailCondition', {
        id: req.params.id
    });
});

router.post('/:id', function(req, res) {

    knex('conditions').insert({
            trail_id: req.params.id,
            user_id: JSON.parse(req.session.id),
            comment: req.body.condition.comment,
            creation_date: new Date()
        })
        .then(function(data) {
            console.log(data);
            res.redirect('/trails/' + req.params.id);
        })
        .catch(function(err) {
            res.sendStatus(500);
        });
});

router.delete('/delete/:id', function(req, res) {
    console.log('entered delete function');
    knex('conditions').delete().where({
        id: req.params.id
    }).then(function(data) {
        console.log(data);
        res.redirect('/users/' + req.session.id);
    }).catch(function(err) {
        console.log(err);
        res.sendStatus(500);
    });
});


module.exports = router;

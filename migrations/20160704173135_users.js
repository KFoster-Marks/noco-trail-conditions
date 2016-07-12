'use strict';

exports.up = function(knex, Promise) {

  return knex.schema.createTable('users', function (table) {
    table.increments();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('city');
    table.string('favorite_trail');
    table.string('username').notNullable();
    table.string('password').notNullable();

  }).then(function(data) {

    return Promise.all([
      knex('users').insert({
        name: 'Jennie Zinko',
        email: 'jzinko@gmail.com',
        city: 'Fort Collins',
        favorite_trail: 'Horsetooth Rock',
        username: 'jzinko',
        password: '1234'
      }),

      knex('users').insert({
        name: 'Aaron Marks',
        email: 'awie@gmail.com',
        city: 'Loveland',
        favorite_trail: 'Devil\s Backbone',
        username: 'aaron',
        password: '1234'
      }),

      knex('users').insert({
        name: 'Lydia Page',
        email: 'ld@gmail.com',
        city: 'LaPorte',
        favorite_trail: 'Timber Trail',
        username: 'lydia',
        password: '1234'
      })
    ]);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};

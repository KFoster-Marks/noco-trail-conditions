'use strict';

exports.up = function(knex, Promise) {

  return knex.schema.createTable('users', function (table) {
    table.increments();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('username').notNullable();
    table.string('password').notNullable();

  }).then(function(data) {

    return Promise.all([
      knex('users').insert({
        name: 'Jennie Zinko',
        email: 'jzinko@gmail.com',
        username: 'jzinko',
        password: 'jzinko'
      }),

      knex('users').insert({
        name: 'Aaron Marks',
        email: 'awie@gmail.com',
        username: 'aaron',
        password: 'aaron'
      }),

      knex('users').insert({
        name: 'Lydia Paige',
        email: 'ld@gmail.com',
        username: 'lyds',
        password: 'ld'
      })
    ]);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};

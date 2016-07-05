'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('trail-areas', function (table) {
    table.increments();
    table.text('name').notNullable();
  }).then(function(data) {
    return Promise.all([

      knex('trail-areas').insert({
        name: 'Horsetooth Mountain Park'
      }),

      knex('trail-areas').insert({
        name: 'Lory State Park'
      })

    ]);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};

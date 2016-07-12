'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('trail_areas', function (table) {
    table.increments();
    table.text('name');
  }).then(function(data) {
    return Promise.all([

      knex('trail_areas').insert({
        name: 'Horsetooth Mountain Park'
      }),

      knex('trail_areas').insert({
        name: 'Lory State Park'
      }),

      knex('trail_areas').insert({
        name: 'Fort Collins'
      })

    ]);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('trail_areas');
};

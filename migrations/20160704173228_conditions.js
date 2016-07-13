'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('conditions', function (table) {
    table.increments();
    table.integer('trail_id');
    table.text('comment');
    table.timestamp('creation_date');
  }).then(function(data) {

    return Promise.all([

      knex('conditions').insert({
        trail_id: '2',
        comment: 'Lots of ice still up near the top, but spikes shouldn\'t be necessary today.',
        creation_date: new Date()
      }),

      knex('conditions').insert({
        trail_id: '2',
        comment: 'Ice has melted a little bit throughout the day, making conditions really slushy.',
        creation_date: new Date()
      }),

      knex('conditions').insert({
        trail_id: '1',
        comment: 'Sunny and windy and a family of rattlesnakes terrorizing small children.',
        creation_date: new Date()
      }),

      knex('conditions').insert({
        trail_id: '1',
        comment: 'Hundreds of mountain lions and bears patrolling the area. Better stay away today.',
        creation_date: new Date()
      })

    ]);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('conditions');
};

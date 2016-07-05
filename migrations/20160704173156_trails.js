'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('trails', function (table) {
    table.increments();
    table.string('name').notNullable();
    table.string('description').notNullable();
    table.integer('trail_length').notNullable();
    table.integer('elevation_gain').notNullable();
    table.integer('trail_area_id').notNullable();
  }).then(function(data) {

    return Promise.all([
      knex('trails').insert({
        name: 'Horsetooth Rock',
        description: 'The summit is long and thin with unabated panoramas across the eastern plains, lower foothills, reservoir, and Rocky Mountains. Notable from these heights are hogbacks, or homoclinal ridges, that run uniformly north-south between the plains and foothills. These uplifted and tilted formations are typically comprised of two compressed sedimentary layers that eroded at different rates. As the softer layer erodes, its slopes steepen and the harder layer emerges along it edges. These rounded formations with a jagged rock outline resemble the knobby spine of a hog.',
        trail_length: 5,
        elevation_gain: 1526,
        trail_area_id: 1
      }),

      knex('trails').insert({
        name: 'Arthur\'s Rock',
        description: 'Arthur\'s Rock Trail is a 3 mile moderately trafficked out and back trail located near Bellvue, CO that features beautiful wild flowers and is rated as moderate. The trail is primarily used for hiking, walking, nature trips, and birding and is accessible from March until October. Dogs are also able to use this trail but must be kept on leash.',
        trail_length: 3,
        elevation_gain: 1036,
        trail_area_id: 2
      }),

    ]);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};

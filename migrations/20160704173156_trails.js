'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('trails', function (table) {
    table.increments();
    table.string('name');
    table.text('description');
    table.float('trail_length');
    table.integer('elevation_gain');
    //table.integer('trail_area_id');
  }).then(function(data) {

    return Promise.all([
      knex('trails').insert({
        name: 'Horsetooth Rock',
        description: 'The summit is long and thin with unabated panoramas across the eastern plains, lower foothills, reservoir, and Rocky Mountains. Notable from these heights are hogbacks, or homoclinal ridges, that run uniformly north-south between the plains and foothills. These uplifted and tilted formations are typically comprised of two compressed sedimentary layers that eroded at different rates.',
        trail_length: 5,
        elevation_gain: 1526,
        //trail_area_id: 1
      }),

      knex('trails').insert({
        name: 'Inlet Bay Trail',
        description: 'Mostly dirt trail that connects the Blue Sky and Soderberg parking lots.',
        trail_length: 2.6,
        elevation_gain: 150,
        //trail_area_id: 1
      }),

      knex('trails').insert({
        name: 'Arthur\'s Rock',
        description: 'Arthur\'s Rock Trail is a 3 mile moderately trafficked out and back trail located near Bellvue, CO that features beautiful wild flowers and is rated as moderate. The trail is primarily used for hiking, walking, nature trips, and birding and is accessible from March until October. Dogs are also able to use this trail but must be kept on leash.',
        trail_length: 3,
        elevation_gain: 1036,
        //trail_area_id: 2
      }),

      knex('trails').insert({
        name: 'Timber Trail',
        description: 'This trail ascends from a picnic area to the ridge behind Arthur\'s Rock. The trail climbs through meadows and mountain shrubs, changing to pine and fir in the upper elevations, where the park\s six primitive back-country sites can be found.',
        trail_length: 4.2,
        elevation_gain: 975,
        //trail_area_id: 2
      }),

      knex('trails').insert({
        name: 'Poudre Trail',
        description: 'The Poudre Trail meanders along the Poudre River. It currently runs between the Overland Trail at Lyons Park and the Environmental Learning Center on East Drake. Expansion of this trail east toward I-25 is expected over the next several years.',
        trail_length: 10,
        elevation_gain: null,
        //trail_area_id: 3
      }),

      knex('trails').insert({
        name: 'Foothills Trail',
        description: 'The Foothills Trail is an earthen trail that travels along the foothills parallel to Horsetooth Reservoir from Dixon Reservoir at Pineridge Natural Area to Reservoir Ridge Natural Area and Michand Lane. This trail is on rugged terrain.',
        trail_length: 6.8,
        elevation_gain: 1000,
        //trail_area_id: 3
      }),

    ]);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('trails');
};

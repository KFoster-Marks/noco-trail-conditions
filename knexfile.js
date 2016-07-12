'use strict';

module.exports = {

  development: {
    client: 'postgresql',
    connection: 'postgres://localhost/trailConditions',
    pool: {
      min: 1,
      max: 1
    }
  }
};

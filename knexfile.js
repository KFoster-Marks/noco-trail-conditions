'use strict';

module.exports = {

  development: {
    client: 'postgresql',
    connection: 'postgres://localhost/trail-conditions',
    pool: {
      min: 1,
      max: 1
    }
  }
};

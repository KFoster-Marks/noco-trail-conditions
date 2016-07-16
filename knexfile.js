'use strict';

module.exports = {

  development: {
    client: 'postgresql',
    connection: 'postgres://localhost/trailConditions',
    pool: {
      min: 1,
      max: 1
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    }
  }
};

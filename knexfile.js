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
      database: process.env.DATABASE_URL,
      user:     'username',
      password: 'password'
    },
    migrations: {
      directory: __dirname + '/db/migrations'
    },
  }
};

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

  // production: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'dbj99m1bl1kpei',
  //     user:     'pdzkzaiywoqxxe',
  //     password: '278QDcG2LwKBGjkmqyKS3M5QH1'
  //   }
  //   ,
  //   migrations: {
  //     directory: __dirname + '/migrations'
  //   },
  // }

  production: {
  client: 'postgresql',
  connection: process.env.DATABASE_URL,
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }
}
};

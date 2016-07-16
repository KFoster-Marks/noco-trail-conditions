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
      database: 'postgres://pdzkzaiywoqxxe:278QDcG2LwKBGjkmqyKS3M5QH1@ec2-107-20-166-28.compute-1.amazonaws.com:5432/dbj99m1bl1kpei',
      user:     'username',
      password: 'password'
    },
    migrations: {
      directory: __dirname + '/db/migrations'
    },
  }
};

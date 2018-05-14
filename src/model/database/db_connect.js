const pgp = require('pg-promise')();

require('env2')('./config.env');

const DB_URL =
  process.env.ENV === 'test'
    ? process.env.TEST_DB_URL
    : process.env.DB_URL;

if (!DB_URL) {
  throw new Error('Environment variable DB_URL must be set!');
}

module.exports = pgp({
  DB_URL,
});

const db = require('./../database/db_connect');

// post username and password to users table

const getAllData = () =>
  db.query(`SELECT * from users`);

// post a symptom to symptom

// post scale comments for symptom scale

// post a factor to factor table

// post scale comment for factor scale

// post symptom ratings

// post factor ratings

module.exports = getAllData;

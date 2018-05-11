const dbConnect = require('../database/db_connect.js');
// get username and password from users table
const getUserData = username => dbConnect.query('SELECT password FROM users WHERE username=$1', [username])
  .then(res => res[0]);

// get a symptom from symptoms table
const getSymptoms = userId => dbConnect.query('SELECT * FROM symptoms WHERE user_id=$1', [userId]);

// get scale comments for symptom scale

// get a factor from factors table
const getFactors = userId => dbConnect.query('SELECT * FROM factors WHERE user_id=$1', [userId]);

// get username and password from users table

// get a symptom from symptoms table

// get scale comments for symptom scale

// get a factor from factors table

// get scale comment for factor scale

// get specific symptom ratings

// get specific factor ratings

module.exports = { getUserData, getSymptoms, getFactors };


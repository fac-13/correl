const dbConnect = require('../database/db_connect.js');

// post username and password to users table
const postUserData = (username, password) => dbConnect.query('insert into users (username, password) values ($1, $2)', [username, password]);
// post a symptom to symptom
const postSymptom = (symptom, username) => dbConnect.query('insert into symptoms (symptom, user_id) values ($1, (select id from users where username=$2))', [symptom, username]);

// post a factor to factor table
const postFactor = (factor, username) => dbConnect.query('insert into factors (factor, user_id) values ($1, (select id from users where username=$2))', [factor, username]);

// post scale comments for symptom scale

// post scale comment for factor scale

// post symptom ratings

// post factor ratings

module.exports = { postUserData, postSymptom };

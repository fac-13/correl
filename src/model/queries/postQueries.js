const dbConnect = require('../database/db_connect.js');

// post username and password to users table
const addUser = (username, password) => dbConnect.query('insert into users (username, password) values ($1, $2)', [username, password]);
// post a symptom to symptom
const postSymptom = (symptom, username) => dbConnect.query(`insert into symptoms (symptom, user_id)
 values ($1, (select id from users where username=$2))`, [symptom, username]);

// post a factor to factor table
const postFactor = (factor, username) => dbConnect.query(`insert into factors (factor, user_id)
values ($1, (select id from users where username=$2))`, [factor, username]);

// post scale comments for symptom scale
const postSymptomScale = (symptom, username, comment_1, comment_2, comment_3, comment_4, comment_5, comment_6, comment_7, comment_8, comment_9, comment_10) => {
  dbConnect.query(
    `insert into symptom_scale (symptom_id, user_id, comment_1, comment_2, comment_3, comment_4, comment_5, comment_6, comment_7, comment_8, comment_9, comment_10)
    values (
      (select id from symptoms where symptom = $1 and user_id=(select id from users where username=$2)),
        (select id from users where username = $2),
        $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
    [symptom, username, comment_1, comment_2, comment_3, comment_4, comment_5, comment_6, comment_7, comment_8, comment_9, comment_10],
  );
};
// post scale comment for factor scale
const postFactorScale = (factor, username, comment_1, comment_2, comment_3, comment_4, comment_5, comment_6, comment_7, comment_8, comment_9, comment_10) => dbConnect.query(
  `insert into factor_scale (factor_id, user_id, comment_1, comment_2, comment_3, comment_4, comment_5, comment_6, comment_7, comment_8, comment_9, comment_10)
  values ((select id from factors where factor = $1 and user_id=(select id from users where username=$2)),
  (select id from users where username = $2), $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
  [factor, username, comment_1, comment_2, comment_3, comment_4, comment_5, comment_6, comment_7, comment_8, comment_9, comment_10],
);

// post symptom ratings
const postSymptomRating = (symptom_id, username, rating) => dbConnect.query(`insert into symptom_data (symptom_id, user_id, rating)
  values($1, (select id from users where username=$2),$3)`, [symptom_id, username, rating]);

// post factor ratings
const postFactorRating = (factor_id, username, rating) => dbConnect.query(`insert into factor_data (factor_id, user_id, rating)
  values($1, (select id from users where username=$2),$3)`, [factor_id, username, rating]);

module.exports = {
  addUser, postSymptom, postFactor, postSymptomScale, postFactorScale, postSymptomRating, postFactorRating,
};

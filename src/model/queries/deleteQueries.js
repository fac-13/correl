const dbConnect = require('../database/db_connect.js');

const deleteSymptom = (symptom, username) => dbConnect.query(`delete from symptoms
  where symptom=$1
  and user_id=(select id from users where username=$2)`, [symptom, username]);

const deleteFactor = (factor, username) => dbConnect.query(`delete from factors
  where factor=$1
  and user_id=(select id from users where username=$2)`, [factor, username]);

module.exports = { deleteSymptom, deleteFactor };


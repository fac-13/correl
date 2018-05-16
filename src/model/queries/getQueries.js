const dbConnect = require('../database/db_connect.js');

// get username and password from users table
const getUserData = username => dbConnect.query('SELECT password FROM users WHERE username=$1', [username]);


// get user symptoms, symptoms_id AND comments from symptoms & symptom_scale
const getSymptoms = username => dbConnect.query(`select sy.symptom, sy.id as symptomId, sc.*
from symptoms as sy
left join symptom_scale AS sc on sy.id=sc.symptom_id 
where sy.user_id = (select id from users where username=$1)`, [username]);

// get all user factors from factor table
const getFactors = username => dbConnect.query('select factor, factors.id as factorid, factor_scale.* from factors left join factor_scale on factors.id=factor_scale.factor_id where factors.user_id = (select id from users where username=$1)', [username]);

// get scale comments for symptom scale
const getSymptomScale = (symptom, username) => dbConnect.query('select * from symptom_scale where symptom_id = (select id from symptoms where symptom=$1) and user_id = (select id from users where username=$2);)', [symptom, username]);

// get scale comment for factor scale
const getFactorScale = (factor, username) => dbConnect.query('select * from factor_scale where factor_id = (select id from factors where factor=$1) and user_id = (select id from users where username=$2);)', [factor, username]);

// get specific symptom data
const getSymptomRatings = username => dbConnect.query('select symptom_data.rating, symptom_data.date_entered, symptoms.symptom from symptom_data left join symptoms on symptoms.id = symptom_data.symptom_id where symptom_data.user_id = (select id from users where username=$1)', [username]);
// get specific factor data
const getFactorRatings = username => dbConnect.query('select factor_data.rating, factor_data.date_entered, factors.factor from factor_data left join factors on factors.id = factor_data.factor_id where factor_data.user_id = (select id from users where username=$1)', [username]);

module.exports = {
  getUserData, getSymptoms, getFactors, getSymptomScale, getFactorScale, getSymptomRatings, getFactorRatings,
};

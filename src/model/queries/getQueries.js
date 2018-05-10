const dbConnect = require('../database/db_connect.js');
// get username and password from users table
const getUserData = username => dbConnect.query('SELECT password FROM users WHERE username=$1', [username])
  .then((res) => {
    console.log('res0', res[0]);
    return res[0];
  })
  .catch(err => console.log(err));

// get a symptom from symptoms table
const getSymptoms = user_id => dbConnect.query('SELECT * FROM symptoms WHERE user_id=$1', [user_id])
  // can catch error when query is called (can delete)
  .catch(err => console.log(err));

// get scale comments for symptom scale

// get a factor from factors table
const getFactors = user_id => dbConnect.query('SELECT * FROM factors WHERE user_id=$1', [user_id])
  // can catch error when query is called (can delete)
  .catch(err => console.log(err));
// get scale comment for factor scale

// get specific symptom ratings

// get specific factor ratings


module.exports = { getUserData, getSymptoms, getFactors };

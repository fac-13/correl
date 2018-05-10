const dbConnect = require('../database/db_connect.js');
// get username and password from users table
const getUserData = username =>
  dbConnect.query('SELECT password FROM users WHERE username=$1', [username])
    .then((res) => {
      console.log('res0', res[0]);
      return res[0];
    });
// .catch(err => console.log(err));
// get a symptom from symptoms table

// get scale comments for symptom scale

// get a factor from factors table

// get scale comment for factor scale

// get specific symptom ratings

// get specific factor ratings


module.exports = { getUserData };

// const runDbBuild = require('../model/database/db_build.js');
// const { getUserData } = require('../model/queries/getQueries');
// const dbConnect = require('../model/database/db_connect');
// // const { postUserData } = require('../model/queries/postQueries');
// const test = require('tape');

// runDbBuild();

// test('simple test', (t) => {
//   dbConnect.query('SELECT * FROM users')
//     .then(res => res[0]).then((queryResult) => {
//       t.deepEqual(
//         Object.keys(queryResult),
//         ['id', 'username', 'password'],
//         'three keys',
//       );
//       t.equal(queryResult.username, 'eade', 'returns eade');
//       t.equal(queryResult.password, 'passworddd', 'should return passworddd');
//       t.end();
//     });
// });

// // test query to get username and password from users table
// test('testing that getUserData returns an object with user password', (t) => {
//   getUserData('eade').then((queryResult) => {
//     t.equal(
//       queryResult.password,
//       'passworddd',
//       'queryResult should contain passworddd',
//     );
//     t.end();
//   })
//     .catch(console.log);
// });


// // test query to get a symptom from symptoms table

// // test query to get scale comments for symptom scale

// // test query to get a factor from factors table

// // test query to get scale comment for factor scale

// // test query to get specific symptom ratings

// // test query to get specific factor ratings


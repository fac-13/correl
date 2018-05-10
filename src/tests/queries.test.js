const runDbBuild = require('../model/database/db_build.js');
const { getUserData, getSymptoms, getFactors } = require('../model/queries/getQueries');
// const { postUserData } = require('../model/queries/postQueries');
const test = require('tape');

// test query to get username and password from users table
test('testing that getUserData returns an object with user password', (t) => {
  runDbBuild()
    .then((res) => {
      t.ok(res);
      return getUserData('eade');
    })
    .then((queryResult) => {
      t.equal(
        queryResult.password,
        'passworddd',
        'queryResult should contain passworddd',
      );
    })
    .catch((e) => {
      t.error(e, 'error with getting user data');
    });
  t.end();
});

// test query to get a symptom from symptoms table
test('testing symptoms query returns something', (t) => {
  runDbBuild()
    .then(() => getSymptoms(1))
    .then((queryResult) => {
      t.ok(queryResult);
    })
    .catch((e) => {
      t.error(e, 'error with symptoms query');
    });
  t.end();
});

// test query to get scale comments for symptom scale

// test query to get a factor from factors table
test('testing factors query returns something', (t) => {
  runDbBuild()
    .then(() => getFactors(1))
    .then((queryResult) => {
      t.ok(queryResult);
    })
    .catch((e) => {
      t.error(e, 'error with factors query');
    });
  t.end();
});

// test query to get scale comment for factor scale

// test query to get specific symptom ratings


// test query to get specific factor ratings


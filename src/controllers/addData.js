const { getSymptoms, getFactors } = require('../model/queries/getQueries');
const postQueries = require('../model/queries/postQueries');

exports.get = (req, res) => {
  if (req.session.loggedIn) {
    const promiseArray = [getSymptoms(req.session.username), getFactors(req.session.username)];
    Promise.all(promiseArray)
      .then((resultsArray) => {
        const [symptomsList, factorsList] = resultsArray;
        res.render('addData', { symptomsList, factorsList, username: req.session.username });
      })
      .catch(err => console.log(err.message));
  } else {
    res.render('logIn');
  }
};

exports.post = (req, res) => {
  console.log('postttttt!');
  res.render('profile');
};

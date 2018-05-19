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
  const keys = Object.keys(req.body);
  const symptoms = keys.filter(key => key.startsWith('s'));
  const factors = keys.filter(key => key.startsWith('f'));
  const promiseArray = [];

  for (let i = 0; i < symptoms.length; i++) {
    const symptomRating = req.body[symptoms[i]];
    symptoms[i] = symptoms[i].substr(1);
    promiseArray.push(postQueries.postSymptomRating(symptoms[i], req.session.username, symptomRating));
  }
  for (let i = 0; i < factors.length; i++) {
    const factorRating = req.body[factors[i]];
    factors[i] = factors[i].substr(1);
    promiseArray.push(postQueries.postFactorRating(factors[i], req.session.username, factorRating));
  }

  Promise.all(promiseArray)
    .then(() => {
      res.render('profile', { username: req.session.username });
    })
    .catch(err => console.log(err.message));
};

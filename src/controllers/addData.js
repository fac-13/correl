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
  console.log('body', req.body);
  const keys = Object.keys(req.body);
  const symptoms = keys.filter(key => key.startsWith('s'));
  console.log(symptoms);
  const symptomsRatings = Object.values(req.body);
  const factors = keys.filter(key => key.startsWith('f'));
  console.log(factors);
  const factorsRating = Object.values(req.body);
  for (let i = 0; i < keys.length; i++) {
    const symptomsRes = getSymptoms(req.session.username)
      .then(syms => console.log(syms));

    const promiseArray = [postQueries.postSymptomRating(symptomsRes[0].symptom, req.session.username, symptomsRatings[i]), postQueries.postFactorRating(factors[i], req.session.username, factorsRating[i])];
    Promise.all(promiseArray)
      .then(() => {
        // res.render('profile');
        console.log('sent!');
      })
      .catch(err => console.log(err.message));
  }
};


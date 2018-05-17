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
  console.log('keys: ', keys);

  const symptoms = keys.filter(key => key.startsWith('s'));
  const factors = keys.filter(key => key.startsWith('f'));

  const allRatings = Object.values(req.body);
  const symptomsRatings = allRatings.slice(0, symptoms.length);
  const factorsRatings = allRatings.slice(symptomsRatings.length);

  console.log('S ratings: ', symptomsRatings);
  console.log('F ratings: ', factorsRatings);


  for (let i = 0; i < keys.length - 1; i++) {
    getSymptoms(req.session.username)
      .then(syms => syms.symptom)
      .then((symptom) => {
        const promiseArray = [
          postQueries.postSymptomRating(symptom, req.session.username, symptomsRatings[i]),
          // postQueries.postFactorRating(factors[i], req.session.username, factorsRatings[i]),
        ];
        Promise.all(promiseArray);
      }).then(() => res.redirect('/profile'))
      .catch(err => console.log(err.message));

    // const promiseArray = [postQueries.postSymptomRating(symptoms[i], req.session.username, symptomsRatings[i]), postQueries.postFactorRating(factors[i], req.session.username, factorsRating[i])];
    // Promise.all(promiseArray)
    //   .then(() => {
    //     // res.render('profile');
    //     console.log('sent!');
    //   })
    //   .catch(err => console.log(err.message));
  }
};


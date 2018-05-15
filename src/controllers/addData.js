const { getSymptoms, getFactors } = require('../model/queries/getQueries');

exports.get = (req, res) => {
  if (req.session.loggedIn) {
    const promiseArray = [getSymptoms('eade'), getFactors('eade')];
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

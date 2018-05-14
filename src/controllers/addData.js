let symptomsList;
let factorsList;
const queries = require('../model/queries/getQueries');

exports.get = (req, res) => {
  if (req.session.loggedIn) {
    const promiseArray = [queries.getSymptoms('eade'), queries.getFactors('eade')];
    Promise.all(promiseArray)
      .then((resultsArray) => {
        console.log(resultsArray);
        res.render('addData', { symptomsList, factorsList, username: req.session.username });
      });
  } else {
    res.render('logIn');
  }
};

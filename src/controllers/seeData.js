const { getSymptomRatings, getFactorRatings } = require('../model/queries/getQueries');

exports.get = (req, res) => {
  // getSymptomRatings(username);
  // getFactorRatings(username);

  if (req.session.loggedIn) {
    res.render('seeData', { username: req.session.username });
  } else {
    res.render('logIn');
  }
};

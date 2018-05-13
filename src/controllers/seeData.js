const { getSymptomRatings, getFactorRatings } = require('../model/queries/getQueries');

exports.get = (req, res) => {
  // getSymptomRatings(username);
  // getFactorRatings(username);
  res.render('seeData', { username: req.session.username });
};

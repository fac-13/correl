const postQueries = require('./../model/queries/postQueries');
const getQueries = require('./../model/queries/getQueries');
const deleteQueries = require('./../model/queries/deleteQueries');

exports.getHome = (req, res) => {
  if (req.session.loggedIn) {
    const factorsList = [];
    return getQueries
      .getFactors(req.session.username)
      .then((factors) => {
        factors.forEach((factor) => {
          const obj = {};
          obj.factor = factor.factor;
          factorsList.push(obj);
        });
        return factorsList;
      })
      .then(() => {
        res.render('factorsHome', { factorsList, username: req.session.username });
      })
      .catch(err => res.render('error'));
  }
  res.render('logIn');
};

exports.getAdd = (req, res) => {
  if (req.session.loggedIn) {
    res.render('factorsAdd', { username: req.session.username });
  } else {
    res.render('logIn');
  }
};

exports.postAdd = (req, res) => postQueries
  .postFactor(req.body.factor, req.session.username)
  .then(() => res.render('factorScaleInfo', { username: req.session.username }))
  .catch(err => res.render('error'));

exports.getScaleInfo = (req, res) => {
  if (req.session.loggedIn) {
    res.render('factorScaleInfo', { username: req.session.username });
  } else {
    res.render('logIn');
  }
};

exports.getScaleSetup = (req, res) => {
  if (req.session.loggedIn) {
    res.render('factorsScaleSetup', { username: req.session.username });
  } else {
    res.render('logIn');
  }
};

exports.postScaleSetup = (req, res) => getQueries
  .getFactors(req.session.username)
  .then(factor => postQueries
    .postFactorScale(factor[factor.length - 1].factor, req.session.username, req.body['1'], req.body['2'], req.body['3'], req.body['4'], req.body['5'], req.body['6'], req.body['7'], req.body['8'], req.body['9'], req.body['10']))
  .then(() => res.render('profile', { username: req.session.username }))
  .catch(err => res.render('error'));

exports.delete = (req, res) => {
  console.log('delete factor');
  const { factor } = req.params;
  const { username } = req.session;
  return deleteQueries
    .deleteFactor(factor, username)
    .catch(err => res.render('error'));
};

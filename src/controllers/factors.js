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

        console.log(factorsList);
        return factorsList;
      })
      .then(() => { res.render('factorsHome', { factorsList, username: req.session.username }); });
  }
  res.render('logIn');
};

exports.getAdd = (req, res) => {
  if (req.session.loggedIn) {
    res.render('factorsAdd');
  } else {
    res.render('logIn');
  }
};

exports.postAdd = (req, res) => postQueries
  .postFactor(req.body.factor, req.session.username)
  .then(() => res.render('factorScaleInfo'))
  .catch((err) => { console.log(err.message); });

exports.getScaleInfo = (req, res) => {
  if (req.session.loggedIn) {
    res.render('factorScaleInfo');
  } else {
    res.render('logIn');
  }
};

exports.getScaleSetup = (req, res) => {
  if (req.session.loggedIn) {
    res.render('factorsScaleSetup');
  } else {
    res.render('logIn');
  }
};

exports.postScaleSetup = (req, res) => getQueries
  .getFactors(req.session.username)
  .then(factor => postQueries
    .postFactorScale(factor[factor.length - 1].factor, req.session.username, req.body['1'], req.body['2'], req.body['3'], req.body['4'], req.body['5'], req.body['6'], req.body['7'], req.body['8'], req.body['9'], req.body['10']))
  .then(() => res.render('profile'))
  .catch(err => console.log(err.message));

exports.delete = (req, res) => {
  const { factor } = req.params;
  const { username } = req.session;
  return deleteQueries
    .deleteFactor(factor, username)
    .catch((err) => {
      console.log(err.message);
    });
};

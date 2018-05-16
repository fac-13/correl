const postQueries = require('./../model/queries/postQueries');
const getQueries = require('./../model/queries/getQueries');

exports.getHome = (req, res) => {
  if (req.session.loggedIn) {
    const factorsList = {};
    return getQueries
      .getFactors(req.session.username)
      .then((factors) => {
        factors.forEach((factor) => {
          factorsList[factor.factor] = factor.factor;
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
  .then(() => res.render('factorsScaleSetup'))
  .catch((err) => { console.log(err.message); });

exports.getScaleInfo = (req, res) => {
  if (req.session.loggedIn) {
    res.render('scaleInfo');
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

exports.postScaleSetup = (req, res) => {
  console.log(req.body);
  console.log('username', req.session.username);
  return getQueries
    .getFactors(req.session.username)
    .then((factor) => {
      console.log('factor', factor[factor.length - 1].factor);
      return postQueries
        .postFactorScale(factor[factor.length - 1].factor, req.session.username, req.body['1'], req.body['2'], req.body['3'], req.body['4'], req.body['5'], req.body['6'], req.body['7'], req.body['8'], req.body['9'], req.body['10']);
    })
    .then(() => res.render('profile'))
    .catch(err => console.log(err.message));
};

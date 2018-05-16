const postQueries = require('./../model/queries/postQueries');
const getQueries = require('./../model/queries/getQueries');

exports.getHome = (req, res) => {
  if (req.session.loggedIn) {
    res.render('factorsHome', { factorsList, username: req.session.username });
  } else {
    res.render('logIn');
  }
};

exports.getAdd = (req, res) => {
  if (req.session.loggedIn) {
    res.render('factorsAdd');
  } else {
    res.render('logIn');
  }
};

exports.postAdd = (req, res) => {
  postQueries
    .postFactor(req.session.username)
    .catch((err) => { console.log(err.message); });
};


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
      console.log('factor', factor);
      return postQueries
        .postFactorScale(factor, req.session.username, req.body['1'], req.body['2'], req.body['3'], req.body['4'], req.body['5'], req.body['6'], req.body['7'], req.body['8'], req.body['9'], req.body['10']);
    })
    .then(() => res.render('factorsScaleSetup'))
    .catch(err => console.log(err.message));
};

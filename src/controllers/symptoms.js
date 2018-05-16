const postQueries = require('./../model/queries/postQueries');
const getQueries = require('./../model/queries/getQueries');

exports.getHome = (req, res) => {
  if (req.session.loggedIn) {
    const symptomsList = {};
    return getQueries
      .getSymptoms(req.session.username)
      .then((symptoms) => {
        symptoms.forEach((symptom) => {
          symptomsList[symptom.symptom] = symptom.symptom;
        });
        return symptomsList;
      })
      .then(() => { res.render('symptomsHome', { symptomsList, username: req.session.username }); });
  }
  res.render('logIn');
};

exports.getAdd = (req, res) => {
  if (req.session.loggedIn) {
    res.render('symptomsAdd');
  } else {
    res.render('logIn');
  }
};

exports.postAdd = (req, res) => postQueries
  .postSymptom(req.body.symptom, req.session.username)
  .then(() => res.render('symptomsScaleSetup'))
  .catch(err => console.log(err.message));

exports.getScaleInfo = (req, res) => {
  if (req.session.loggedIn) {
    res.render('scaleInfo');
  } else {
    res.render('logIn');
  }
};

exports.getScaleSetup = (req, res) => {
  if (req.session.loggedIn) {
    res.render('symptomsScaleSetup');
  } else {
    res.render('logIn');
  }
};

exports.postScaleSetup = (req, res) => {
  console.log(req.session.username);
  console.log(req.body);
  return getQueries
    .getSymptoms(req.session.username)
    .then((symptom) => {
      console.log(symptom);
      return postQueries
        .postSymptomScale(symptom[symptom.length - 1].symptom, req.session.username, req.body['1'], req.body['2'], req.body['3'], req.body['4'], req.body['5'], req.body['6'], req.body['7'], req.body['8'], req.body['9'], req.body['10']);
    })
    .then(() => res.render('profile'))
    .catch(err => console.log(err.message));
};


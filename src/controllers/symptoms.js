const symptomsList = [{ symptom: 'fatigue' }, { symptom: 'dry skin' }];

exports.getHome = (req, res) => {
  if (req.session.loggedIn) {
    res.render('symptomsHome', { symptomsList, username: req.session.username });
  } else {
    res.render('logIn');
  }
};

exports.getAdd = (req, res) => {
  if (req.session.loggedIn) {
    res.render('symptomsAdd');
  } else {
    res.render('logIn');
  }
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
    res.render('symptomsScaleSetup');
  } else {
    res.render('logIn');
  }
};

const symptomsList = [{ symptom: 'fatigue' }, { symptom: 'dry skin' }];

exports.getHome = (req, res) => {
  if (req.session.loggedIn) {
    res.render('symptomsHome', { symptomsList, username: req.session.username });
  } else {
    res.render('login');
  }
};

exports.getAdd = (req, res) => {
  if (req.session.loggedIn) {
    res.render('symptomsAdd');
  } else {
    res.render('login');
  }
};

exports.getScaleInfo = (req, res) => {
  if (req.session.loggedIn) {
    res.render('scaleInfo');
  } else {
    res.render('login');
  }
};

exports.getScaleSetup = (req, res) => {
  if (req.session.loggedIn) {
    res.render('symptomsScaleSetup');
  } else {
    res.render('login');
  }
};

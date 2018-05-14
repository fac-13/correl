const factorsList = [{ factor: 'water' }, { factor: 'sleep' }];

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

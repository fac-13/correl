const factorsList = [{ factor: 'water' }, { factor: 'sleep' }];

exports.getHome = (req, res) => {
  if (req.session.loggedIn) {
    res.render('factorsHome', { factorsList, username: req.session.username });
  } else {
    res.render('login');
  }
};


exports.getAdd = (req, res) => {
  res.render('factorsAdd');
};

exports.getScaleInfo = (req, res) => {
  res.render('scaleInfo');
};

exports.getScaleSetup = (req, res) => {
  res.render('factorsScaleSetup');
};

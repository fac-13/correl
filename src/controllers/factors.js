const factorsList = [{ factor: 'water' }, { factor: 'sleep' }];

exports.getHome = (req, res) => {
  if (req.session.loggedIn) {
    res.render('factorsHome', { factorsList, username: req.session.username });
  } else {
    res.render('login');
  }
};


exports.getAdd = (req, res) => {
  if (req.session.loggedIn) {
    res.render('factorsAdd');
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
    res.render('factorsScaleSetup');
  } else {
    res.render('login');
  }
};

const factorsList = [{ factor: 'water' }, { factor: 'sleep' }];

exports.getHome = (req, res) => {
  res.render('factorsHome', { factorsList });
};

exports.getAdd = (req, res) => {
  res.render('factorsAdd');
};

exports.getScaleInfo = (req, res) => {
  res.render('factorsScaleInfo');
};

exports.getScaleSetup = (req, res) => {
  res.render('factorsScaleSetup');
};

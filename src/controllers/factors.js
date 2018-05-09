exports.getHome = (req, res) => {
  res.render('factorsHome');
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

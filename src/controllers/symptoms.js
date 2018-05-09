exports.getHome = (req, res) => {
  res.render('symptomsHome');
};

exports.getAdd = (req, res) => {
  res.render('symptomsAdd');
};

exports.getScaleInfo = (req, res) => {
  res.render('symptomsScaleInfo');
};

exports.getScaleSetup = (req, res) => {
  res.render('symptomsScaleSetup');
};

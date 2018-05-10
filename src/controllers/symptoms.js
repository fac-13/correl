const symptomsList = [{ symptom: 'fatigue' }, { symptom: 'dry skin' }];

exports.getHome = (req, res) => {
  res.render('symptomsHome', { symptomsList });
};

exports.getAdd = (req, res) => {
  res.render('symptomsAdd');
};

exports.getScaleInfo = (req, res) => {
  res.render('scaleInfo');
};

exports.getScaleSetup = (req, res) => {
  res.render('symptomsScaleSetup');
};

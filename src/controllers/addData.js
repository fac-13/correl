const symptomsList = [{ symptom: 'fatigue' }, { symptom: 'headache' }];
const factorsList = [{ factor: 'water' }, { factor: 'sleep' }];


exports.get = (req, res) => {
  res.render('addData', { symptomsList, factorsList });
};

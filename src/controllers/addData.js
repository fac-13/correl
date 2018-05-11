const symptomsList = [{ symptom: 'fatigue' }, { symptom: 'dry skin' }];
const factorsList = [{ factor: 'water' }, { factor: 'sleep' }];


exports.get = (req, res) => {
  res.render('addData', { symptomsList, factorsList });
};

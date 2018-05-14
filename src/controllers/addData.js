const symptomsList = [{ symptom: 'fatigue' }, { symptom: 'headache' }];
const factorsList = [{ factor: 'water' }, { factor: 'sleep' }];


exports.get = (req, res) => {
  if (req.session.loggedIn) {
    res.render('addData', { symptomsList, factorsList, username: req.session.username });
  } else {
    res.render('logIn');
  }
};

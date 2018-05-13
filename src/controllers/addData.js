const symptomsList = [{ symptom: 'fatigue' }, { symptom: 'dry skin' }];
const factorsList = [{ factor: 'water' }, { factor: 'sleep' }];


exports.get = (req, res) => {
  if (req.session.loggedIn) {
    res.render('addData', { symptomsList, factorsList, username: req.session.username });
  } else {
    res.render('login');
  }
};

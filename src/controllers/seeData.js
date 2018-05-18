const { getSymptomRatings, getFactorRatings } = require('../model/queries/getQueries');


const getAllData = (username) => {
  const obj = {};
  return getSymptomRatings(username).then((result) => {
    obj.symptoms = result;
    return obj;
  }).then(() => getFactorRatings(username)).then((result) => {
    obj.factors = result;
    return obj;
  })
    .catch(err => console.log(err));
};


exports.getPage = (req, res) => {
  res.render('seeData', { username: req.session.username });
};

exports.getData = (req, res) => {
  getAllData('eade').then((result) => {
    res.send(JSON.stringify(result));
  }).catch(err => console.log(err));
};

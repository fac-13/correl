const { getUserData } = require('../model/queries/getQueries');
const bcrypt = require('bcrypt');

exports.get = (req, res) => {
  res.render('logIn');
};

exports.post = (req, res) => {
  console.log('arrives');
  const { username } = req.body;
  const { password } = req.body;
  getUserData(username)
    .then((result) => {
      if (result.length > 0) {
        return bcrypt.compare(password, result[0].password);
      }
      return false;
    }).then((result) => {
      if (result) {
        req.cook.loggedIn = true;
        req.cook.username = req.body.username;
        res.redirect('/profile');
      } else {
        res.render('login', { notmatch: true });
      }
    });
};

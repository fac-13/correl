const bcrypt = require('bcrypt');
const getQueries = require('./../model/queries/getQueries');


exports.get = (req, res) => {
  res.render('logIn', { loggedOut: true });
};


exports.post = (req, res, next) => {
  console.log('sasdf');
  // const { username } = req.body;
  // const { password } = req.body;
  // getQueries.getUserData(username)
  //   .then((result) => {
  //     if (result.length > 0) {
  //       return bcrypt.compare(password, result[0].password);
  //     }
  //     return false;
  //   }).then((result) => {
  //     if (result) {
  //       req.session.loggedIn = true;
  //       req.session.username = username;
  //       res.redirect('/profile');
  //     } else {
  //       res.render('login', { notmatch: true });
  //     }
  //   }).catch((err) => {
  //     console.log(err);
  //     next(err);
  //   });
};

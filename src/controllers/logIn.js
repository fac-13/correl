const bcrypt = require('bcrypt');
const getQueries = require('./../model/queries/getQueries');


exports.get = (req, res) => {
  res.render('logIn', { loggedOut: true });
};

exports.post = (req, res) => {
  console.log('gets to login post');
  const { username } = req.body;
  const { password } = req.body;
  getQueries.getUserData(username)
    .then((result) => {
      if (result.length > 0) {
        return bcrypt.compare(password, result[0].password);
      }
      return false;
    }).then((result) => {
      if (result) {
        console.log('login.js');
        req.cook.loggedIn = true;
        req.cook.username = username;
        res.writeHead(302, { Location: '/profile' });
      } else {
        res.render('login', { notmatch: true });
      }
    });
};

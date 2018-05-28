const queries = require('./../model/queries/postQueries');
const bcrypt = require('bcrypt');


exports.get = (req, res) => {
  res.render('register', { loggedOut: true });
};

exports.post = (req, res, next) => {
  const { username, password } = req.body;
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      next(err);
    } else {
      queries
        .addUser(username, hash)
        .then(() => {
          req.session.loggedIn = true;
          req.session.username = req.body.username;
          res.redirect('/profile');
        }).catch(err => res.render('error'));
    }
  });
};

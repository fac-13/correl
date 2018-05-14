const queries = require('./../model/queries/postQueries');
const bcrypt = require('bcrypt');


exports.get = (req, res) => {
  res.render('register', { loggedOut: true });
};

exports.post = (req, res, next) => {
  const { username, password } = req.body;
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      console.log(`Bcrypt error is: ${err.message}`);
      next(err);
    } else {
      queries
        .addUser(username, hash)
        .then(() => {
          console.log('final then');
          req.session.loggedIn = true;
          req.session.username = req.body.username;
          res.redirect('/profile');
        }).catch((err) => {
          console.log(err);
        });
    }
  });
};


exports.get = (req, res) => {
  if (req.session.loggedIn) {
    res.render('profile', { username: req.session.username });
  } else {
    res.render('login');
  }
};

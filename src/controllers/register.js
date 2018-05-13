exports.get = (req, res) => {
  res.render('register', { loggedOut: true });
};

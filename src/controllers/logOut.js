exports.get = (req, res) => {
  req.session = null;
  res.render('logIn', { loggedOut: true });
};

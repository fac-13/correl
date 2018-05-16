
exports.get = (req, res) => {
  res.session = null;
  res.render('logIn', { loggedOut: true });
};

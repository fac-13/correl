exports.get = (req, res) => {
  res.render('logIn', { loggedOut: true });
};

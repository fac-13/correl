exports.get = (req, res) => {
  res.render('home', { loggedOut: true });
};

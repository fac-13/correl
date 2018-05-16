exports.get = (req, res) => {
  res.render('instruction', { loggedOut: true });
};

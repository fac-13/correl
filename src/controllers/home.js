exports.get = (req, res, next) => {
  res.render('home', { photoData, firstPhoto, fadeInClass });
};

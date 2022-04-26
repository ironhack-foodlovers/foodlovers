module.exports = (req, res, next) => {
  // checks if the user is logged in when trying to access a specific page
  if (!req.user) {
    return res.redirect("/login");
  }
  req.user = req.session.user;
  next();
};


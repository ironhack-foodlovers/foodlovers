const router = require("express").Router();
const User = require('../models/User')
const bcrypt = require('bcrypt')
const passport = require('passport')

const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");

router.get("/login", isLoggedOut, (req, res, next) => {
 
    res.render("auth/login");
  });

  router.post('/login', isLoggedOut, passport.authenticate('local', {
	successRedirect: '/my-restaurants',
	failureRedirect: '/login'
}));



router.get("/signup", isLoggedOut, (req, res) => {
    res.render("auth/signup");
  });

router.post("/signup", isLoggedOut, (req, res, next) => {
	const { username, password } = req.body

    if (!username) {
        return res.status(400).render("auth/signup", {
          errorMessage: "Please provide your username.",
        });
      }
    
      if (password.length < 4) {
        return res.status(400).render("auth/signup", {
          errorMessage: "Your password needs to be at least 8 characters long.",
        });
      }

	// do we already have a user with that username in the db?
	User.findOne({ username: username })
		.then(userFromDB => {
			if (userFromDB !== null) {
				res.render('auth/signup', { message: 'Username is alredy taken' })
			} else {
				// we can use that username
				// and hash the password
        
				const salt = bcrypt.genSaltSync()
				const hash = bcrypt.hashSync(password, salt)
				const restaurants = []
        
				// create the user
        User.create({ username, password: hash })
        .then(createdUser => {

          req.login(createdUser, function(err) {
            if (err) { return next(err); }
            return res.redirect('/my-restaurants');
          });       
          
        })
        .catch(err => next(err))
			}
		})
});

router.get('/logout', isLoggedIn, (req, res, next) => {

    req.session.destroy((err) => {
        if (err) {
          return res
            .status(500)
            .render("/", { errorMessage: err.message });
        }
        res.redirect("/");
      });

});




module.exports = router;

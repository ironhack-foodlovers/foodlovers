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
	successRedirect: '/',
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
				// create the user
				User.create({ username, password: hash })
					.then(createdUser => {
						
                        req.session.user = createdUser;
                       // console.log( req.session.user)
                    
						// if we want to log the user in using passport
						// req.login()
						res.redirect('/')
					})
					.catch(err => next(err))
			}
		})
});

router.get('/logout', isLoggedIn, (req, res, next) => {
    console.log(req.session.user)

    req.session.destroy((err) => {
        if (err) {
          return res
            .status(500)
            .render("auth/logout", { errorMessage: err.message });
        }
        res.redirect("/login");
      });

});




module.exports = router;

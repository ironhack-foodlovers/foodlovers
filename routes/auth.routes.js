const router = require("express").Router();
const User = require('../models/User')
const bcrypt = require('bcrypt')
const passport = require('passport')

router.get("/login", (req, res, next) => {
    res.render("auth/login");
  });

  router.post('/login', passport.authenticate('local', {
	successRedirect: '/my-restaurants',
	failureRedirect: '/login'
}));



router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.post('/signup', (req, res, next) => {
	const { username, password } = req.body

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
						console.log(createdUser)
						// if we want to log the user in using passport
						// req.login()
						res.redirect('restaurants/my-restaurants')
					})
					.catch(err => next(err))
			}
		})
});

router.get('/logout', (req, res, next) => {
	req.logout();
	res.redirect('/')
});




module.exports = router;

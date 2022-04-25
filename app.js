// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// session configuration

const session = require('express-session')
const MongoStore = require('connect-mongo')

app.use(
	session({
		secret: process.env.SESSION_SECRET,
		cookie: { maxAge: 1000 * 60 * 60 * 24 },
		resave: true,
		saveUninitialized: true,
		store: MongoStore.create({
			mongoUrl: process.env.MONGO_URI
		})
	})
)
// end of session configuration

// passport config

const User = require('./models/User.model')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

passport.serializeUser((user, done) => {
	done(null, user._id)
})

passport.deserializeUser((id, done) => {
	User.findById(id)
		.then(user => {
			done(null, user)
		})
		.catch(err => {
			done(err)
		})
})

// register the local strategy (authentication using username and password)
passport.use((
	new LocalStrategy((username, password, done) => {
		// this logic will be executed when we log in
		User.findOne({ username: username })
			.then(user => {
				if (user === null) {
					// username is not correct
					done(null, false, { message: 'Wrong Credentials' })
				} else {
					done(null, user)
				}
			})
	})
))

app.use(passport.initialize())
app.use(passport.session())

// end of passport config


// default value for title local
const capitalized = require("./utils/capitalized");
const projectName = "restaurant-review";

app.locals.appTitle = `${capitalized(projectName)} created with IronLauncher`;



// 👇 Start handling routes here
const index = require("./routes/index.routes");
app.use("/", index);

const auth = require("./routes/auth.routes");
app.use("/", auth);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;

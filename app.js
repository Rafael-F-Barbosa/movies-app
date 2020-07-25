// installed modules
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

// vanilla modules
const path = require('path');

// routes
const moviesRoutes = require('./routes/movies');
const directorsRoutes = require('./routes/directors');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

// models
const User = require('./models/user');

// database connection
const mongoConnect = require('./util/database').mongoConnect;

// create the express application
const app = express();
// initialize a new store session
const store = new MongoDBStore({
	uri: 'mongodb+srv://Rafael-F-Barbosa:3aWKh7qeDCgu1RK1@cluster0.gtpef.mongodb.net/MyVideos',
	collection: 'sessions'
});

// set default view engine and views directory
app.set('view engine', 'ejs');
app.set('views', 'views');

// SOME MIDDLEWARES

// serving files statically
app.use(express.static(path.join(__dirname, 'public')));

// middleware that alows to parse in forms
app.use(bodyParser.urlencoded({ extended: false }));

// sessions initialize and configured
app.use(
	session({
		secret: 'my secret',
		resave: false,
		saveUninitialized: false,
		store: store
	})
);
// getting the user in the correct object format
app.use((req, res, next) => {
	if (!req.session.user) {
		return next();
	}
	User.findById(req.session.user._id)
		.then((user) => {
			console.log('user:' + user.name + ' sendo usado');
			req.user = new User(user.name, user.email, user.password, user.watchedMovies, user.wishMovies);
			next();
		})
		.catch((err) => console.log(err));
});

// END MIDDLEWARES

// mount the app routes
app.use(userRoutes);
app.use('/movies', moviesRoutes);
app.use('/directors', directorsRoutes);
app.use(authRoutes);

// home redirect
app.get('/', (req, res, next) => {
	return res.redirect('/movies');
});

// error handler
app.use((req, res, next) => {
	res.status(404).render('404', {
		pageTitle: 'Error',
		isLoggedIn: req.session.isLoggedIn
	});
});

// Connect to mongodb
mongoConnect(() => {
	console.log('Ok');
});

module.exports = app;

// installed modules
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

// vanilla modules
const path = require('path');

// routes
const indexRoutes = require('./routes/index');
const moviesRoutes = require('./routes/movies');
const directorsRoutes = require('./routes/directors');
const authRoutes = require('./routes/auth');

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

// Some middleres

// serving files statically
app.use(express.static(path.join(__dirname, 'public')));

// middleware that alows to parse in forms
app.use(bodyParser.urlencoded({ extended: false }));

// sessions initialize and configured
app.use(session({ secret: 'my secret', resave: false, saveUninitialized: false, store: store }));

// end Some middleres

// mount the app routes
app.use(indexRoutes);
app.use('/movies', moviesRoutes);
app.use('/directors', directorsRoutes);
app.use(authRoutes);

// error handler
app.use((req, res, next) => {
	res.status(404).render('404', {
		pageTitle: 'Error'
	});
});

// Connect to mongodb
mongoConnect(() => {
	console.log('Ok');
});

module.exports = app;

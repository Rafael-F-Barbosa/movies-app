// installed modules
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash');
const multer = require('multer');

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
const mongoURI = require('./util/database').mongoURI;
// create the express application
const app = express();
// initialize a new store session
const store = new MongoDBStore({
	uri: mongoURI,
	collection: 'sessions'
});

// set default view engine and views directory
app.set('view engine', 'ejs');
app.set('views', 'views');

// SOME MIDDLEWARES

// serving files statically
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));

// middleware that alows to parse in forms
app.use(bodyParser.urlencoded({ extended: false }));

// middleware function that alows the use of images in requests
const fileStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'images');
	},
	filename: (req, file, cb) => {
		cb(null, new Date().toISOString() + '-' + file.originalname);
	}
});
const fileFilter = (req, file, cb) => {
	if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
		cb(null, true);
	} else {
		cb(null, false);
	}
};
// app.use(multer({storage: fileStorage, fileFilter: fileFilter}).single('directorImg'))
// app.use(multer({storage: fileStorage, fileFilter: fileFilter}).single('movieImg'))
app.use(
	multer({ storage: fileStorage, fileFilter: fileFilter }).fields([
		{ name: 'movieImg', maxCount: 1 },
		{ name: 'directorImg', maxCount: 1 }
	])
);

// sessions initialize and configured
app.use(
	session({
		secret: 'my secret',
		resave: false,
		saveUninitialized: false,
		store: store
	})
);
// registering flash after sessions
app.use(flash());

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
		isLoggedIn: req.session.isLoggedIn,
		path: ''
	});
});

// Connect to mongodb
mongoConnect(() => {
	app.listen(PORT, () => console.log(`Listening on ${PORT}`));
});

const PORT = process.env.PORT || 3000;

// module.exports = app;

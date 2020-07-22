exports.getWatchedMovies = (req, res, next) => {
	const movies = req.user.watchedMovies;

	res.render('movie/movies', {
		pageTitle: 'My movies',
		movies: movies,
		isLoggedIn: req.session.isLoggedIn
	});
};

exports.getsWishedList = (req, res, next) => {
	const movies = req.session.user.wishMovies;

	res.render('movie/movies', {
		pageTitle: 'Wished list',
		movies: movies,
		isLoggedIn: req.session.isLoggedIn
	});
};

exports.getWatchedMovies = (req, res, next) => {
	const moviesIds = req.user.watchedMovies;
	req.user.getMyMovies(moviesIds).then((movies) => {
		res.render('movie/movies', {
			pageTitle: 'My movies',
			movies: movies,
			isLoggedIn: req.session.isLoggedIn
		});
	});
};

exports.getsWishedList = (req, res, next) => {
	const moviesIds = req.user.wishMovies;
	req.user.getMyMovies(moviesIds).then((movies) => {
		res.render('movie/movies', {
			pageTitle: 'Wished list',
			movies: movies,
			isLoggedIn: req.session.isLoggedIn
		});
	});
};

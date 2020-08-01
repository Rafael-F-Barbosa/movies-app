exports.getWatchedMovies = (req, res, next) => {
	const moviesIds = req.user.watchedMovies;
	req.user.getMyMovies(moviesIds).then((movies) => {
		res.render('movie/movies', {
			pageTitle: 'My movies',
			movies: movies,
			isLoggedIn: req.session.isLoggedIn,
			userList: 'watched',
			path: '/watched-movies'
		});
	});
};

exports.getsWishedList = (req, res, next) => {
	const moviesIds = req.user.wishMovies;
	req.user.getMyMovies(moviesIds).then((movies) => {
		res.render('movie/movies', {
			pageTitle: 'Wished list',
			movies: movies,
			isLoggedIn: req.session.isLoggedIn,
			userList: 'wish',
			path: '/wish-list'
		});
	});
};

exports.postAddWatched = (req, res, next) => {
	const user = req.user;
	const movieId = req.body.movieId;
	user
		.saveToWatchList(movieId, req.session.user._id)
		.then(() => {
			res.redirect(`/movies/movie-details/${movieId}`);
		})
		.catch((err) => {
			console.log(err);
		});
};
exports.postDeleteWatched = (req, res, next) => {
	const movieId = req.body.movieId;
	req.user
		.deleteWatched(movieId, req.session.user._id)
		.then(() => {
			console.log('movie deleted');
		})
		.catch((err) => {
			console.log(err);
		});

	res.redirect('/watched-movies');
};

exports.postAddWish = (req, res, next) => {
	const user = req.user;
	const movieId = req.body.movieId;
	user
		.saveToWishList(movieId, req.session.user._id)
		.then(() => {
			res.redirect(`/movies/movie-details/${req.body.movieId}`);
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.postDeleteWish = (req, res, next) => {
	const movieId = req.body.movieId;
	req.user
		.deleteWish(movieId, req.session.user._id)
		.then(() => {
			console.log('movie deleted');
		})
		.catch((err) => {
			console.log(err);
		});

	res.redirect('/wish-list');
};

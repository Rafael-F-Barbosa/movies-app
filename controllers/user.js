const ITEMS_PER_PAGE = 6;

exports.getWatchedMovies = (req, res, next) => {
	const moviesIds = req.user.watchedMovies;
	let page = +req.query.page || 1;
	const totalMovies = moviesIds.length;
	if (page > Math.ceil(totalMovies / ITEMS_PER_PAGE)) {
		page = Math.ceil(totalMovies / ITEMS_PER_PAGE);
	}
	req.user.getMyMovies(moviesIds, ITEMS_PER_PAGE, page).then((movies) => {
		res.render('movie/movies', {
			pageTitle: 'My movies',
			movies: movies,
			isLoggedIn: req.session.isLoggedIn,
			userList: 'watched',
			path: '/watched-movies',
			currentPage: page,
			hasNextPage: ITEMS_PER_PAGE * page < totalMovies,
			hasPreviousPage: page > 1,
			nextPage: page + 1,
			previousPage: page - 1,
			lastPage: Math.ceil(totalMovies / ITEMS_PER_PAGE)
		});
	});
};

exports.getsWishedList = (req, res, next) => {
	const moviesIds = req.user.wishMovies;
	let page = +req.query.page || 1;
	const totalMovies = moviesIds.length;
	if (page > Math.ceil(totalMovies / ITEMS_PER_PAGE)) {
		page = Math.ceil(totalMovies / ITEMS_PER_PAGE);
	}
	req.user.getMyMovies(moviesIds, ITEMS_PER_PAGE, page).then((movies) => {
		res.render('movie/movies', {
			pageTitle: 'Wished list',
			movies: movies,
			isLoggedIn: req.session.isLoggedIn,
			userList: 'wish',
			path: '/wish-list',
			currentPage: page,
			hasNextPage: ITEMS_PER_PAGE * page < totalMovies,
			hasPreviousPage: page > 1,
			nextPage: page + 1,
			previousPage: page - 1,
			lastPage: Math.ceil(totalMovies / ITEMS_PER_PAGE)
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

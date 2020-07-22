const Movie = require('../models/movie');
const Director = require('../models/director');
// const User = require('../models/user');

exports.getMovies = (req, res, next) => {
	Movie.fetchAll()
		.then((movies) => {
			res.render('movie/movies', {
				pageTitle: 'All movies',
				movies: movies,
				isLoggedIn: req.session.isLoggedIn
			});
			console.log('Movies fetched from mongodb!');
		})
		.catch((err) => console.log(err));
};

exports.getAddMovies = (req, res, next) => {
	Director.fetchAll().then((directors) => {
		res.render('movie/add-movie', {
			pageTitle: 'Add movies',
			directors: directors,
			isLoggedIn: req.session.isLoggedIn
		});
	});
};

exports.postAddMovies = (req, res, next) => {
	const movieTitle = req.body.title;
	const directorId = req.body.directorId;
	const movieYear = req.body.year;

	Director.findById(directorId).then((director) => {
		const movieCreated = new Movie(movieTitle, movieYear, director.name, directorId);

		movieCreated
			.save()
			.then((movieDb) => {
				const d = new Director(director.name, director.birthYear, director.movies);
				d.addMovie(movieCreated, director._id).then(() => {
					res.redirect('/');
				});
			})
			.catch((err) => console.log(err));
	});
};

exports.getMovie = (req, res, next) => {
	const movieId = req.params.movieId;
	Movie.findById(movieId)
		.then((movie) => {
			res.render('movie/movie-details', {
				pageTitle: movie.title,
				movie: movie,
				isLoggedIn: req.session.isLoggedIn
			});
		})
		.catch((err) => console.log(err));
};

exports.postAddWatched = (req, res, next) => {
	const user = req.user;
	const movieId = req.body.movieId;
	user
		.saveToWatchList(movieId, '5f105e4e3ec3cb3f5f78f950')
		.then(() => {
			res.redirect(`/movies/movie-details/${movieId}`);
		})
		.catch((err) => {
			console.log(err);
		});
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

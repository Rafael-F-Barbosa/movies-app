const Movie = require('../models/movie');
const Director = require('../models/director');
const { validationResult } = require('express-validator');

const ITEMS_PER_PAGE = 6;

exports.getMovies = (req, res, next) => {
	let page = +req.query.page || 1;
	let totalMovies;
	Movie.countMovies()
		.then((totalMov) => {
			totalMovies = totalMov;
			if (page > Math.ceil(totalMovies / ITEMS_PER_PAGE)) {
				page = Math.ceil(totalMovies / ITEMS_PER_PAGE);
			}
			Movie.fetchAll(ITEMS_PER_PAGE, page).then((movies) => {
				res.render('movie/movies', {
					pageTitle: 'All movies',
					movies: movies,
					isLoggedIn: req.session.isLoggedIn,
					userList: null,
					path: '/movies',
					currentPage: page,
					hasNextPage: ITEMS_PER_PAGE * page < totalMovies,
					hasPreviousPage: page > 1,
					nextPage: page + 1,
					previousPage: page - 1,
					lastPage: Math.ceil(totalMovies / ITEMS_PER_PAGE)
				});
				console.log('Movies fetched from mongodb!');
			});
		})
		.catch((err) => console.log(err));
};

exports.getAddMovies = (req, res, next) => {
	Director.fetchAll().then((directors) => {
		res.render('movie/add-movie', {
			pageTitle: 'Add movies',
			directors: directors,
			isLoggedIn: req.session.isLoggedIn,
			errorMessage: null,
			path: '/movies/add'
		});
	});
};
exports.postAddMovies = (req, res, next) => {
	const movieTitle = req.body.title;
	const directorId = req.body.directorId;
	const movieYear = req.body.year;

	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		console.log(errors.array());
		return Director.fetchAll().then((directors) => {
			res.render('movie/add-movie', {
				pageTitle: 'Add movies',
				directors: directors,
				isLoggedIn: req.session.isLoggedIn,
				errorMessage: errors.array()[0].msg,
				path: '/movies/add'
			});
		});
	}

	if (!req.files['movieImg']) {
		return Director.fetchAll().then((directors) => {
			return res.status(422).render('movie/add-movie', {
				pageTitle: 'Add movies',
				directors: directors,
				isLoggedIn: req.session.isLoggedIn,
				errorMessage: 'Invalid file type!',
				path: '/movies/add'
			});
		});
	}
	const movieImg = req.files['movieImg'][0];
	const movieUrl = '/' + movieImg.path;

	Director.findById(directorId).then((director) => {
		console.log(director);
		const movieCreated = new Movie(movieTitle, movieYear, director.name, directorId, movieUrl);
		movieCreated
			.save()
			.then((movieDb) => {
				const d = new Director(director.name, director.birthYear, director.movies, director.image);
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
				isLoggedIn: req.session.isLoggedIn,
				path: ''
			});
		})
		.catch((err) => console.log(err));
};

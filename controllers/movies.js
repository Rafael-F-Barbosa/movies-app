const Movie = require('../models/movie');
const Director = require('../models/director');

exports.getMovies = (req, res, next) => {
	Movie.fetchAll()
		.then((movies) => {
			res.render('movie/movies', {
				pageTitle: 'Add movies',
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

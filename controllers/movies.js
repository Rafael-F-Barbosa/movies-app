const Movie = require('../models/movie');
const Director = require('../models/director');

exports.getAddMovies = (req, res, next) => {
	Director.fetchAll().then((directors) => {
		res.render('add-movie', { pageTitle: 'Add movies', directors: directors });
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
			.then(() => {
				res.redirect('/');
			})
			.catch((err) => console.log(err));
	});
};

exports.getMovie = (req, res, next) => {
	const movieId = req.params.movieId;
	Movie.findById(movieId)
		.then((movie) => {
			res.render('movie-details', { pageTitle: movie.title, movie: movie });
		})
		.catch((err) => console.log(err));
};

const Movie = require('../models/movie');

exports.getAddMovies = (req, res, next) => {
	res.render('add-movie', { pageTitle: 'Add movies' });
};

exports.postAddMovies = (req, res, next) => {
	const movieTitle = req.body.title;
	const movieDirector = req.body.director;
	const movieYear = req.body.year;
	const movieCreated = new Movie(movieTitle, movieDirector, movieYear);
	movieCreated
		.save()
		.then(() => {
			res.redirect('/');
		})
		.catch((err) => console.log(err));
};

exports.getMovie = (req, res, next) => {
	const movieId = req.params.movieId;
	Movie.findById(movieId)
		.then((movie) => {
            res.render('movie-details', { pageTitle: movie.title, movie: movie });
		})
		.catch((err) => console.log(err));
};

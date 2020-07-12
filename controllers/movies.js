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

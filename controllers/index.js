const Movie = require('../models/movie');

exports.getIndex = (req, res, next) => {
	Movie.fetchAll()
		.then((movies) => {
			res.render('index', {
				pageTitle: 'Add movies',
				movies: movies,
				isLoggedIn: req.session.isLoggedIn
			});
			console.log('Movies fetched from mongodb!');
		})
		.catch((err) => console.log(err));
};

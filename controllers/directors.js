const Director = require('../models/director');

exports.getDirectors = (req, res, next) => {
	Director.fetchAll()
		.then((directors) => {
			res.render('directors', {
				pageTitle: 'Directors',
				directors: directors
			});
			console.log('Directors fetched from mongodb!');
		})
		.catch((err) => console.log(err));
};

exports.getAddDirector = (req, res, next) => {
	res.render('add-director', { pageTitle: 'Add director' });
};

exports.postAddDirector = (req, res, next) => {
	const directorName = req.body.name;
	const directorbirthYear = req.body.birthYear;
	const directorCreated = new Director(directorName, directorbirthYear, []);
	directorCreated
		.save()
		.then(() => {
			res.redirect('/directors');
		})
		.catch((err) => console.log(err));
};

exports.getDirector = (req, res, next) => {
	const directorId = req.params.directorId;
    Director.findById(directorId)
		.then((director) => {
            res.render('director-details', { pageTitle: director.name, director: director });
		})
		.catch((err) => console.log(err));
};
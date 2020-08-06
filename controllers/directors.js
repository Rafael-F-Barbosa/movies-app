const Director = require('../models/director');
const { validationResult } = require('express-validator');
const ITEMS_PER_PAGE = 6;

exports.getDirectors = (req, res, next) => {
	let page = +req.query.page || 1;
	console.log(page);
	let totalDirectors;
	Director.countDirectors()
		.then((numberOfDirectors) => {
			totalDirectors = numberOfDirectors;
			if (page > Math.ceil(totalDirectors / ITEMS_PER_PAGE)) {
				page = Math.ceil(totalDirectors / ITEMS_PER_PAGE);
			}
			Director.fetchAll(ITEMS_PER_PAGE, page).then((directors) => {
				res.render('director/directors', {
					pageTitle: 'Directors',
					directors: directors,
					isLoggedIn: req.session.isLoggedIn,
					path: '/directors',
					currentPage: page,
					hasNextPage: ITEMS_PER_PAGE * page < totalDirectors,
					hasPreviousPage: page > 1,
					nextPage: page + 1,
					previousPage: page - 1,
					lastPage: Math.ceil(totalDirectors / ITEMS_PER_PAGE)
				});
				console.log('Directors fetched from mongodb!');
			});
		})
		.catch((err) => console.log(err));
};

exports.getAddDirector = (req, res, next) => {
	res.render('director/add-director', {
		pageTitle: 'Add director',
		isLoggedIn: req.session.isLoggedIn,
		path: '/directors/add',
		errorMessage: null
	});
};

exports.postAddDirector = (req, res, next) => {
	const directorName = req.body.name;
	const directorbirthYear = req.body.birthYear;
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.render('director/add-director', {
			pageTitle: 'Add director',
			isLoggedIn: req.session.isLoggedIn,
			path: '/directors/add',
			errorMessage: errors.array()[0].msg
		});
	}

	if (!req.files['directorImg']) {
		return res.render('director/add-director', {
			pageTitle: 'Add director',
			isLoggedIn: req.session.isLoggedIn,
			path: '/directors/add',
			errorMessage: 'Invalid file type'
		});
	}
	const directorImg = req.files['directorImg'][0];
	const directorUrl = '/' + directorImg.path;
	const directorCreated = new Director(directorName, directorbirthYear, [], directorUrl);
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
			res.render('director/director-details', {
				pageTitle: director.name,
				director: director,
				isLoggedIn: req.session.isLoggedIn,
				path: ''
			});
		})
		.catch((err) => console.log(err));
};

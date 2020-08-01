const Director = require('../models/director');

exports.getDirectors = (req, res, next) => {
	Director.fetchAll()
		.then((directors) => {
			res.render('director/directors', {
				pageTitle: 'Directors',
				directors: directors,
				isLoggedIn: req.session.isLoggedIn,
				path: '/directors'
			});
			console.log('Directors fetched from mongodb!');
		})
		.catch((err) => console.log(err));
};

exports.getAddDirector = (req, res, next) => {
	res.render('director/add-director', {
		pageTitle: 'Add director',
		isLoggedIn: req.session.isLoggedIn,
		path: '/directors/add'
	});
};

exports.postAddDirector = (req, res, next) => {
	const directorName = req.body.name;
	const directorbirthYear = req.body.birthYear;
	const directorImg = req.files['directorImg'][0];
	if(!directorImg){
		//  Render the correct view with the error message
		return res.redirect('/')
	}
	const directorUrl = '/'+directorImg.path;
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

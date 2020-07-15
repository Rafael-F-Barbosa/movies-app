exports.getLogin = (req, res, next) => {
	res.render('auth/login', {
		pageTitle: 'Login',
		isLoggedIn: req.session.isLoggedIn
	});
};

exports.postLogin = (req, res, next) => {
	req.session.isLoggedIn = true;

	// guarantee that session is configured before redirect
	req.session.save((err) => {
		console.log(err);
		res.redirect('/');
	});
};

exports.postLogout = (req, res, next) => {
	req.session.destroy((err) => {
		console.log(err);
		res.redirect('/');
	});
};

exports.getSignUp = (req, res, next) => {
	res.render('auth/sign-up', { pageTitle: 'Sign up', isLoggedIn: req.session.isLoggedIn });
};

exports.postSignUp = (req, res, next) => {
	console.log('sucess');
	res.redirect('/login');
};

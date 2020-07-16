const User = require('../models/user');

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
	const name = req.body.name;
	const email = req.body.email;
	const password = req.body.password;
	const confirmPassword = req.body.confirmPassword;
	User.findByEmail(email)
		.then((user) => {
			if (user) {
				console.log('email already exists');
				res.redirect('/sign-up');
			} else {
				const newUser = new User(name, email, password, [], []);
				newUser
					.save()
					.then(() => {
						console.log('user saved');
						res.redirect('/login');
					})
					.catch((err) => console.log(err));
			}
		})
		.catch((err) => console.log(err));
};

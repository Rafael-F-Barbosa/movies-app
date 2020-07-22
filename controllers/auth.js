const User = require('../models/user');

const bcrypt = require('bcryptjs');

exports.getLogin = (req, res, next) => {
	res.render('auth/login', {
		pageTitle: 'Login',
		isLoggedIn: req.session.isLoggedIn
	});
};

exports.postLogin = (req, res, next) => {
	const email = req.body.email;
	const password = req.body.password;
	User.findByEmail(email)
		.then((user) => {
			if (!user) {
				return res.redirect('/login');
			}
			bcrypt
				.compare(password, user.password)
				.then((doMatch) => {
					if (!doMatch) {
						return res.redirect('/login');
					}
					console.log(user);
					req.session.isLoggedIn = true;
					req.session.user = user;
					return req.session.save((err) => {
						console.log(err);
						return res.redirect('/');
					});
				})
				.catch((err) => console.log(err));
		})
		.catch((err) => console.log(err));
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
				return res.redirect('/sign-up');
			}
			return bcrypt.hash(password, 12).then((hashPassword) => {
				const newUser = new User(name, email, hashPassword, [], []);
				return newUser
					.save()
					.then(() => {
						console.log('user saved');
						res.redirect('/login');
					})
					.catch((err) => console.log(err));
			});
		})
		.catch((err) => console.log(err));
};

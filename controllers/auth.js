const crypto = require('crypto');

const User = require('../models/user');

const bcrypt = require('bcryptjs');

const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

const transporter = nodemailer.createTransport(
	sendgridTransport({
		auth: {
			api_key: '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'
		}
	})
);

exports.getLogin = (req, res, next) => {
	res.render('auth/login', {
		pageTitle: 'Login',
		isLoggedIn: req.session.isLoggedIn,
		path: '/login'
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
	res.render('auth/sign-up', {
		pageTitle: 'Sign up',
		isLoggedIn: req.session.isLoggedIn,
		path: '/sign-up'
	});
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
						transporter
							.sendMail({
								to: email,
								from: 'rafernandes1998@hotmail.com',
								subject: 'Signup succeded!',
								html: '<h1>You sucessfully signed up!</h1>'
							})
							.then(() => {
								res.redirect('/login');
							})
							.catch((err) => {
								console.log(err);
							});
					})
					.catch((err) => console.log(err));
			});
		})
		.catch((err) => console.log(err));
};

exports.getReset = (req, res, next) => {
	res.render('auth/reset', {
		pageTitle: 'Reset password',
		isLoggedIn: req.session.isLoggedIn,
		path: '/reset'
	});
};
exports.postReset = (req, res, next) => {
	crypto.randomBytes(32, (err, buffer) => {
		if (err) {
			console.log(err);
			return res.redirect('/reset');
		}
		const token = buffer.toString('hex');
		User.findByEmail(req.body.email)
			.then((user) => {
				if (!user) {
					return res.redirect('/reset');
				}
				const objectUser = new User(
					user.name,
					user.email,
					user.password,
					user.watchedMovies,
					user.wishMovies,
					token,
					Date.now() + 3600000
				);
				// console.log(objectUser);
				return objectUser.save();
			})
			.then((result) => {
				transporter
					.sendMail({
						to: req.body.email,
						from: 'rafernandes1998@hotmail.com',
						subject: 'Reset password',
						html: `<h1>Your reset token is: ${token}</h1>`
					})
					.then(() => {
						return res.redirect('/');
					})
					.catch((err) => console.log(err));
			})
			.catch((err) => {
				console.log(err);
			});
	});
};

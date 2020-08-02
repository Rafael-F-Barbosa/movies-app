const express = require('express');

const router = express.Router();

const authController = require('../controllers/auth');

const { check } = require('express-validator');

const User = require('../models/user');

router.get('/login', authController.getLogin);

router.post(
	'/login',
	[
		check('email').isEmail().withMessage('Please enter a valid email!'),
		check('password', 'Passwords should have at least 5 characters and alphanumeric only.')
			.isLength({ min: 5 })
			.isAlphanumeric()
	],
	authController.postLogin
);

router.post('/logout', authController.postLogout);

router.get('/sign-up', authController.getSignUp);

router.post(
	'/sign-up',
	[
		check('email').isEmail().withMessage('Please enter a valid email!').custom((value, { req }) => {
			return User.findByEmail(value).then((user) => {
				if (user) {
					req.flash('error', 'Email already exists!');
					return Promise.reject('Email already exists!');
				}
				return true;
			});
		}),
		check('password', 'At least 5 characters and alphanumeric only.').isLength({ min: 5 }).isAlphanumeric(),
		check('confirmPassword').custom((value, { req }) => {
			if (value !== req.body.password) {
				throw new Error("Passwords don't match!");
			}
			return true;
		})
	],
	authController.postSignUp
);

router.get('/reset', authController.getReset);

router.post('/reset', authController.postReset);

module.exports = router;

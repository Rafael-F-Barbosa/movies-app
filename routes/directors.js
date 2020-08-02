const express = require('express');

const directorsController = require('../controllers/directors');

const isAuth = require('../middleware/isAuth');

const { check } = require('express-validator');

const router = express.Router();

router.get('/', directorsController.getDirectors);

router.get('/add', isAuth, directorsController.getAddDirector);

router.post(
	'/add',
	isAuth,
	[
		check('name').isString().isLength({ min: 1 }).withMessage('Please, write a name.'),
		check('birthYear', 'Please, write the birth year.').isInt()
	],
	directorsController.postAddDirector
);

router.get('/director-details/:directorId', directorsController.getDirector);

module.exports = router;

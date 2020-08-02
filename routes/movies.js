const express = require('express');

const moviesController = require('../controllers/movies');

const isAuth = require('../middleware/isAuth');

const { check } = require('express-validator');

const router = express.Router();

router.get('/', moviesController.getMovies);

router.get('/add', isAuth, moviesController.getAddMovies);

router.post(
	'/add',
	isAuth,
	[
		check('title').isString().isLength({ min: 1 }).withMessage('Write a title!'),
		check('directorId', 'Select a director').isString().isLength({ min: 1 }),
		check('year', 'Write a number').isInt()
	],
	moviesController.postAddMovies
);

router.get('/movie-details/:movieId', moviesController.getMovie);

module.exports = router;

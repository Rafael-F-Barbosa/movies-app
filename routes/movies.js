const express = require('express');

const moviesController = require('../controllers/movies');

const isAuth = require('../middleware/isAuth');

const router = express.Router();

router.get('/', moviesController.getMovies);

router.get('/add', isAuth, moviesController.getAddMovies);

router.post('/add', isAuth, moviesController.postAddMovies);

router.get('/movie-details/:movieId', moviesController.getMovie);

module.exports = router;

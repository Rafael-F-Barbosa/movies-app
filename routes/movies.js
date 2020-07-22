const express = require('express');

const moviesController = require('../controllers/movies');

const isAuth = require('../middleware/isAuth');

const router = express.Router();

router.get('/', moviesController.getMovies);

router.get('/add', isAuth, moviesController.getAddMovies);

router.post('/add', isAuth, moviesController.postAddMovies);

router.get('/movie-details/:movieId', moviesController.getMovie);

router.post('/add-to-watched', isAuth, moviesController.postAddWatched);

router.post('/add-to-wish', isAuth, moviesController.postAddWish);

router.post('/delete-watched', isAuth, moviesController.postDeleteWatched);

router.post('/delete-wish', isAuth, moviesController.postDeleteWish);

module.exports = router;

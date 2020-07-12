const express = require('express');

const moviesController = require("../controllers/movies");

const router = express.Router();

router.get('/add', moviesController.getAddMovies);

router.post('/add', moviesController.postAddMovies);

router.get('/movie-details/:movieId', moviesController.getMovie)

module.exports = router;
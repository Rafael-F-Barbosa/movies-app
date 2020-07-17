const express = require('express');

const router = express.Router();

const userController = require('../controllers/user');

router.get('/watched-movies', userController.getWatchedMovies);

router.get('/wish-list', userController.getsWishedList);

module.exports = router;

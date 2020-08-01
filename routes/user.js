const express = require('express');

const router = express.Router();

const isAuth = require('../middleware/isAuth');

const userController = require('../controllers/user');

router.get('/watched-movies', userController.getWatchedMovies);

router.get('/wish-list', userController.getsWishedList);

router.post('/add-to-watched', isAuth, userController.postAddWatched);

router.post('/add-to-wish', isAuth, userController.postAddWish);

router.post('/delete-watched', isAuth, userController.postDeleteWatched);

router.post('/delete-wish', isAuth, userController.postDeleteWish);

module.exports = router;

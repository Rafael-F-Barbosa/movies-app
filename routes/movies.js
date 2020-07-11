const express = require('express');

const indexController = require("../controllers/movies");

const router = express.Router();

router.get('/add', indexController.getAddMovies);

router.post('/add', indexController.postAddMovies);

module.exports = router;
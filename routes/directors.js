const express = require('express');

const directorsController = require('../controllers/directors');

const isAuth = require('../middleware/isAuth');

const router = express.Router();

router.get('/', directorsController.getDirectors);

router.get('/add', isAuth, directorsController.getAddDirector);

router.post('/add', isAuth, directorsController.postAddDirector);

router.get('/director-details/:directorId', directorsController.getDirector);

module.exports = router;

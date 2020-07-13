const express = require('express');

const directorsController = require("../controllers/directors");

const router = express.Router();

router.get('/', directorsController.getDirectors)

router.get('/add', directorsController.getAddDirector);

router.post('/add', directorsController.postAddDirector);

router.get('/director-details/:directorId', directorsController.getDirector);

module.exports = router;
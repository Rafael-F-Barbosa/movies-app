const express = require('express');

const router = express.Router();

const authController = require('../controllers/auth');

router.get('/login', authController.getLogin);

router.post('/login', authController.postLogin);

router.post('/logout', authController.postLogout);

router.get('/sign-up', authController.getSignUp);

router.post('/sign-up', authController.postSignUp);

router.get('/reset', authController.getReset);

router.post('/reset', authController.postReset);

module.exports = router;

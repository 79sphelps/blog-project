'use strict';

const express = require('express');
const router = express.Router();
const jwt = require('express-jwt');

const ctrlLanding = require('../controllers/landing.controller');
const ctrlProfile = require('../controllers/profile.controller');
const ctrlAuth = require('../controllers/auth.controller');

const auth = jwt({
    secret: 'MY_SECRET',
    userProperty: 'payload'
});

router.get('/landing', auth, ctrlLanding.landingRead);

// profile
router.get('/profile', auth, ctrlProfile.profileRead);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;
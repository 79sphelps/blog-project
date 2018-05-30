var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');

var ctrlLanding = require('../controllers/landing.controller');
var ctrlProfile = require('../controllers/profile.controller');
var ctrlAuth = require('../controllers/auth.controller');

var auth = jwt({
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
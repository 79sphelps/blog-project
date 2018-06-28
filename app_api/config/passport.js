'use strict';

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = require('../models/user');
//var User = mongoose.model('User');

passport.use(new LocalStrategy({
    usernameField: 'username'
}, 
(username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
        if (err) return done(err);
        
        if (!user) {
            return done(null, false, {message: 'User not found'});
        }

        if (!user.validPassword(password)) {
            return done(null, false, {message: 'Password is wrong'});
        }

        return done(null, user);
    });
}));
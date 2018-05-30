var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
let User = require('../models/user');
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